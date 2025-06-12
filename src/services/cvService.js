const { where } = require("sequelize");
const db = require("../models/index.js");
const projects = require("../models/projects.js");

// handle get CV submitted
let handleGetCV = ({ statusCv = "", batchID = "" }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCvs = {};
            if (statusCv) {
                whereCvs.statusCv = statusCv;
            }

            let whereBatch = {};
            if (batchID) {
                whereBatch.name = batchID;
            }

            let data = await db.Cvs.findAll({
                where: whereCvs, // ✅ Dùng đúng here
                include: [
                    {
                        model: db.Allcodes,
                        as: "dataStatus",
                        attributes: ["value_VI", "value_EN"]
                    },
                    {
                        model: db.Internship_Batches,
                        as: "internshipBatch",
                        where: Object.keys(whereBatch).length > 0 ? whereBatch : undefined,
                        required: Object.keys(whereBatch).length > 0, // ✅ chỉ join bắt buộc nếu có điều kiện
                        include: [
                            {
                                model: db.Allcodes,
                                as: "dataInternship",
                                attributes: ["value_VI", "value_EN"]
                            }
                        ]
                    }
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: data,
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

// handle create CV
let handleCreateCV = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { isValid, message } = checkValidate(input,
                ["userID", "fullName", "email", "phoneNumber",
                    "birthDay", "genderID", "address", "school_name",
                    "major", "degreeID", "gpa", "graduationYear",
                    "career_objective", "references", "skills"]);
            if (isValid) {
                resolve({
                    errCode: 2,
                    message: message,
                });
            } else {
                let infoCv = await db.Cvs.create({
                    userID: input.userID,
                    fullName: input.fullName,
                    email: input.email,
                    phoneNumber: input.phoneNumber,
                    birthDay: input.birthDay,
                    genderID: input.genderID,
                    address: input.address,
                    schoolName: input.school_name,
                    major: input.major,
                    degreeID: input.degreeID,
                    gpa: input.gpa,
                    graduationYear: input.graduationYear,
                    career_objective: input.career_objective,
                    archivement: input.archivements,
                    references: input.references,
                    image: input.image,
                    statusCv: "CV1",
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
        } catch (e) {
            reject(e);
        }
    });
};

// handle get detail Cv
let handleGetDetailCV = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 2,
                    message: "Missing inputID !",
                });
            } else {
                let data = await db.Cvs.findOne({
                    where: { userID: inputID },
                    include: [
                        {
                            model: db.Users,
                            attributes: ["fullName", "email", "studentID", "school_name", "major", "year"],
                        },
                    ],
                });
                if (data) {
                    resolve({
                        errCode: 0,
                        data: data,
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
            let { isValid, message } = checkValidate(input, ["id", "statusCv"]);
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
                        statusCv: input.statusCv,
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

module.exports = { handleGetCV, handleCreateCV, handleGetDetailCV, handleUpdateCV };
