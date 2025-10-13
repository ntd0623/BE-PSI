const db = require("../models/index.js");
const emailService = require("./emailService.js")
// handle get CV submitted
let handleGetCV = ({ status_cv = "", batch_id = "", page, limit = 3 }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const validPage = isNaN(+page) || +page < 1 ? 1 : +page;
            const validLimit = isNaN(+limit) || +limit < 1 ? 3 : +limit;
            const offset = (validPage - 1) * validLimit;

            let whereCvs = {};
            if (status_cv) {
                whereCvs.status_cv = status_cv;
            }

            let whereBatch = {};
            if (batch_id) {
                whereBatch.name = batch_id;
            }

            const result = await db.Cvs.findAndCountAll({
                where: whereCvs,
                include: [
                    {
                        model: db.Allcodes,
                        as: "dataDegree",
                        attributes: ["value_vi", "value_en"]
                    },
                    {
                        model: db.Allcodes,
                        as: "dataStatus",
                        attributes: ["value_vi", "value_en"]
                    },
                    {
                        model: db.Internship_Batches,
                        as: "internshipBatch",
                        where: Object.keys(whereBatch).length > 0 ? whereBatch : undefined,
                        required: Object.keys(whereBatch).length > 0,
                        include: [
                            {
                                model: db.Allcodes,
                                as: "dataInternship",
                                attributes: ["value_vi", "value_en"]
                            }
                        ]
                    },
                    {
                        model: db.Projects,
                        as: "projects"
                    },
                    {
                        model: db.Work_Experiences,
                        as: "experiences"
                    },
                    {
                        model: db.Skills,
                        as: "skills"
                    }
                ],
                offset,
                limit: +validLimit,
                raw: false,
                nest: true,
                distinct: true,
            });
            // encoded base64 render 
            if (result && result.rows && result.rows.length > 0) {
                result.rows.map((item, index) => {
                    if (item.image) {
                        item.image = Buffer.from(item.image, "base64").toString("binary");
                    }
                    return item;
                });
            }
            resolve({
                errCode: 0,
                data: result.rows,
                total: result.count,
                page: +validPage,
                limit: +validLimit
            });
        } catch (error) {
            reject(error);
        }
    });
};



// Check validate input
let checkValidate = (inputData, requiredFields) => {
    for (let i = 0; i < requiredFields.length; i++) {
        let field = requiredFields[i];
        if (inputData[field] === null || !inputData[field]) {
            return {
                isValid: true,
                message: `Missing ${field} !`,
            };
        }
    }
    return {
        isValid: false,
        message: "OK",
    };
};

// handle upsert CV
let handleUpsertCV = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { isValid, message } = checkValidate(input,
                ["user_id", "full_name", "email", "phone_number",
                    "birth_day", "gender_id", "address", "school_name",
                    "major", "degree_id", "gpa", "graduation_year",
                    "career_objective", "references", "skills", "action"]);
            if (isValid) {
                resolve({
                    errCode: 2,
                    message: message,
                });
            }

            if (input.action === "ADD") {

                let infoCv = await db.Cvs.create({
                    user_id: input.user_id,
                    full_name: input.full_name,
                    email: input.email,
                    phone_number: input.phone_number,
                    birth_day: input.birth_day,
                    gender_id: input.gender_id,
                    address: input.address,
                    school_name: input.school_name,
                    major: input.major,
                    degree_id: input.degree_id,
                    gpa: input.gpa,
                    graduation_year: input.graduation_year,
                    career_objective: input.career_objective,
                    archivement: input.archivements,
                    references: input.references,
                    image: input.image,
                    status_cv: "CV1",
                    submission_date: new Date()

                });
                // Process Skill (convert object to more create)
                const allSkills = [];
                for (const type in input.skills) {
                    input.skills[type].forEach(name => {
                        allSkills.push({ name, type });
                    });
                }
                // create more skill
                const insertedSkills = [];
                for (const skill of allSkills) {
                    const [record, created] = await db.Skills.findOrCreate({
                        where: { name: skill.name, type: skill.type },
                        defaults: skill
                    });
                    console.log(`${record.name} (${record.type}) → ${created ? 'Created' : 'Existed'}`);
                    insertedSkills.push(record);
                }
                //create data cv_skill
                await db.Cv_skill.bulkCreate(
                    insertedSkills.map(skill => ({
                        cv_id: infoCv.id,
                        skill_id: skill.id
                    }))
                );

                // project
                if (input.projects && Array.isArray(input.projects)) {
                    const formattedProjects = input.projects.map(project => ({
                        cv_id: infoCv.id,
                        name: project.name?.trim(),
                        technologies: project.technologies?.trim(),
                        description: project.description?.trim(),
                        start_date: project.start_date?.trim(),
                        end_date: project.end_date?.trim(),
                        link: project.link?.trim()
                    }));
                    await db.Projects.bulkCreate(formattedProjects)
                }

                if (input.experience && Array.isArray(input.experience)) {
                    const formattedExperiences = input.experience.map(experience => ({
                        cv_id: infoCv.id,
                        position: experience.position?.trim(),
                        company: experience.nameCompany?.trim(),
                        description: experience.description?.trim(),
                        start_date: experience.startDate?.trim(),
                        end_date: experience.endDate?.trim()
                    }));
                    await db.Work_Experiences.bulkCreate(formattedExperiences)
                }
                resolve({
                    errCode: 0,
                    message: "Create CV successfully",
                });
            }
            if (input.action === "EDIT") {
                const existingCv = await db.Cvs.findOne({
                    where: { id: input.cvID, user_id: input.user_id },
                });

                if (!existingCv) {
                    return resolve({
                        errCode: 1,
                        message: "CV not found!",
                    });
                }

                await existingCv.update({
                    full_name: input.full_name,
                    email: input.email,
                    phone_number: input.phone_number,
                    birth_day: input.birth_day,
                    gender_id: input.gender_id,
                    address: input.address,
                    school_name: input.school_name,
                    major: input.major,
                    degree_id: input.degree_id,
                    gpa: input.gpa,
                    graduation_year: input.graduation_year,
                    career_objective: input.career_objective,
                    archivement: input.archivements,
                    references: input.references,
                    image: input.image,
                    submission_date: new Date(),
                });

                const allSkills = [];
                for (const type in input.skills) {
                    input.skills[type].forEach(name => {
                        allSkills.push({ name, type });
                    });
                }

                const insertedSkills = [];
                for (const skill of allSkills) {
                    const [record] = await db.Skills.findOrCreate({
                        where: { name: skill.name, type: skill.type },
                        defaults: skill
                    });
                    insertedSkills.push(record);
                }

                await db.Cv_skill.destroy({ where: { cv_id: existingCv.id } });
                await db.Cv_skill.bulkCreate(
                    insertedSkills.map(skill => ({
                        cv_id: existingCv.id,
                        skill_id: skill.id
                    }))
                );

                await db.Projects.destroy({ where: { cv_id: existingCv.id } });
                const formattedProjects = input.projects.map(project => ({
                    cv_id: existingCv.id,
                    name: project.name?.trim(),
                    technologies: project.technologies?.trim(),
                    start_date: project.start_date?.trim(),
                    end_date: project.end_date?.trim(),
                    description: project.description?.trim(),
                    link: project.link?.trim()
                }));
                await db.Projects.bulkCreate(formattedProjects);

                await db.Work_Experiences.destroy({ where: { cv_id: existingCv.id } });
                const formattedExperiences = input.experience.map(exp => ({
                    cv_id: existingCv.id,
                    position: exp.position?.trim(),
                    company: exp.nameCompany?.trim(),
                    description: exp.description?.trim(),
                    start_date: exp.startDate?.trim(),
                    end_date: exp.endDate?.trim()
                }));
                await db.Work_Experiences.bulkCreate(formattedExperiences);

                resolve({
                    errCode: 0,
                    message: "Update CV successfully",
                });
            }

        } catch (e) {
            reject(e);
        }
    });
};

// handle get detail Cv
let handleGetDetailCV = ({ id, status_cv = "", page, limit = 3 }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 2,
                    message: "Missing inputID !",
                });
            } else {
                let whereCvs = {
                    user_id: id
                };
                if (status_cv) {
                    whereCvs.status_cv = status_cv;
                }

                const validPage = isNaN(+page) || +page < 1 ? 1 : +page;
                const validLimit = isNaN(+limit) || +limit < 1 ? 3 : +limit;
                const offset = (validPage - 1) * validLimit;
                console.log("Check page: ", validPage)
                let data = await db.Cvs.findAndCountAll({
                    where: whereCvs,
                    limit: validLimit,
                    offset: offset,
                    raw: false,
                    nest: true,
                    distinct: true,
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: db.Allcodes,
                            as: "dataStatus",
                            attributes: ["value_vi", "value_en"]
                        },
                        {
                            model: db.Allcodes,
                            as: "dataDegree",
                            attributes: ["value_vi", "value_en"]
                        },
                        {
                            model: db.Internship_Batches,
                            as: "internshipBatch",
                            include: [
                                {
                                    model: db.Allcodes,
                                    as: "dataInternship",
                                    attributes: ["value_vi", "value_en"]
                                }
                            ]
                        },
                        {
                            model: db.Projects,
                            as: "projects"
                        },
                        {
                            model: db.Work_Experiences,
                            as: "experiences",
                        },
                        {
                            model: db.Skills,
                            as: "skills"
                        }
                    ],
                });
                if (data) {

                    if (data.rows && data.rows.length > 0) {
                        data.rows.map((item, index) => {
                            if (item.image) {
                                item.image = Buffer.from(item.image, "base64").toString("binary");
                            }
                            return item;
                        });
                    }

                    resolve({
                        errCode: 0,
                        data: data.rows,
                        total: data.count,
                        page: +validPage,
                        limit: +validLimit
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

// handle update cv
let handleUpdateCV = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { isValid, message } = checkValidate(input, ["id", "status_cv"]);
            if (isValid) {
                resolve({
                    errCode: 2,
                    message: message,
                });
            } else {
                let data = await db.Cvs.findOne({
                    where: { id: input.id },
                });
                if (data) {
                    await data.update({
                        status_cv: input.status_cv,
                    });
                    await emailService.sendEmail({
                        full_name: data.full_name,
                        status_cv: data.status_cv,
                        reciverEmail: data.email
                    });
                    resolve({
                        errCode: 0,
                        message: "update Cv successfully !",
                    });
                } else {
                    resolve({
                        errCode: -1,
                        message: "Cv not found !",
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const handleGetCVByStudentAndCV = async (input) => {
    try {

        const result = checkValidate(input, ["studentID", "cvID"]);

        if (result && result.isValid === true) {
            return {
                errCode: 2,
                message: `${re.message}`
            }
        }

        const data = await db.Cvs.findOne({
            where: {
                id: input.cvID,
                user_id: input.studentID
            },
            raw: false,
            nest: true,
            include: [
                {
                    model: db.Allcodes,
                    as: "dataStatus",
                    attributes: ["value_vi", "value_en"]
                },
                {
                    model: db.Allcodes,
                    as: "dataDegree",
                    attributes: ["value_vi", "value_en"]
                },
                {
                    model: db.Internship_Batches,
                    as: "internshipBatch",
                    include: [
                        {
                            model: db.Allcodes,
                            as: "dataInternship",
                            attributes: ["value_vi", "value_en"]
                        }
                    ]
                },
                {
                    model: db.Projects,
                    as: "projects"
                },
                {
                    model: db.Work_Experiences,
                    as: "experiences",
                },
                {
                    model: db.Skills,
                    as: "skills"
                }
            ],
        })
        if (!data) {
            return {
                errCode: 3,
                message: "Không tồn tại người dùng hoặc cv !",
            };
        }

        if (data && data.image) {
            data.image = Buffer.from(data.image, "base64").toString("binary");
        }

        return {
            errCode: 0,
            data: data,
        };

    } catch (error) {
        console.error("Error: ", error);
        return {
            errCode: -1,
            message: "Đã xảy ra lỗi trong quá trình gọi API.",
        };
    }
};

const handleDeleteCV = async (id) => {
    try {
        if (!id) {
            return {
                errCode: 2,
                message: "Missing input id !"
            }
        }
        await db.Cv_skill.destroy({ where: { cv_id: id } });

        await db.Projects.destroy({ where: { cv_id: id } });

        await db.Work_Experiences.destroy({ where: { cv_id: id } });

        await db.Cvs.destroy({
            where: { id: id }
        })
        return {
            errCode: 0,
            message: "Delete CV successfully !"
        }

    } catch (error) {
        console.error("Error: ", error);
        return {
            errCode: -1,
            message: "Đã xảy ra lỗi trong quá trình gọi API.",
        };
    }
}

module.exports = { handleGetCV, handleUpsertCV, handleGetDetailCV, handleUpdateCV, handleGetCVByStudentAndCV, handleDeleteCV };
