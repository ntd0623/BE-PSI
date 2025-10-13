const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const salt = bcrypt.genSaltSync(10);
const AppError = require("../../errors.js");
const { Op } = require("sequelize");
//hash password
let hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

// Register

const handleRegister = async (input) => {
    if (!input.captcha) {
        return { errCode: 2, message: "Vui lòng xác minh captcha !" };
    }

    const { data } = await axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
        params: {
            secret: process.env.BACK_END_SECRET_KEY_CAPTCHA,
            response: input.captcha,
        },
    });

    if (!data.success) {
        return { errCode: 3, message: "Xác minh captcha thất bại !" };
    }

    const existingUser = await checkUserEmail(input.email);
    if (existingUser) {
        return { errCode: 4, message: "Email đã tồn tại. Vui lòng nhập email khác !" };
    }

    const user = await db.Users.create({
        email: input.email,
        password: await hashUserPassWord(input.password),
        role_id: "R2",
        name: input.name
    });

    if (!user) {
        return { errCode: 5, message: "Không tìm thấy người dùng" };
    }

    return { errCode: 0, message: "Đăng ký thành công !" };
};


// check mail exists
const checkUserEmail = async (email) => {
    const user = await db.Users.findOne({ where: { email: email } });
    return !!user;
};

// Handle login
const handleUserLogin = async (email, password) => {
    try {
        // Kiểm tra thiếu email
        if (!email) {
            return {
                errCode: 1,
                errField: "email",
                message: "Vui lòng nhập email.",
            };
        }

        // Kiểm tra thiếu mật khẩu
        if (!password) {
            return {
                errCode: 2,
                errField: "password",
                message: "Vui lòng nhập mật khẩu.",
            };
        }

        const isExist = await checkUserEmail(email);
        if (!isExist) {
            return {
                errCode: 3,
                errField: "email",
                message: "Email không tồn tại trong hệ thống.",
            };
        }

        const user = await db.Users.findOne({
            attributes: ["id", "name", "email", "role_id", "password", "avatar"],
            where: { email },
            raw: true,
        });

        if (!user) {
            return {
                errCode: 4,
                errField: "email",
                message: "Người dùng không tồn tại.",
            };
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return {
                errCode: 5,
                errField: "password",
                message: "Sai mật khẩu!",
            };
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_id: user.role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        delete user.password;
        return {
            errCode: 0,
            message: "Đăng nhập thành công.",
            data: user,
            token
        };

    } catch (error) {
        console.error("Login Error: ", error);
        return {
            errCode: -1,
            message: "Đã xảy ra lỗi trong quá trình đăng nhập.",
        };
    }
};


// get cv
let handleGetListCV = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Cvs.findAll({
                // include: [
                //     {
                //         model: db.Allcodes,
                //         as: "dataStatus",
                //         attributes: ["value_en", "value_vi", "key"]
                //     }
                // ],
                raw: true,
                nest: true,
            })
            if (data) {
                resolve({
                    errCode: 0,
                    data: data
                })
            } else {
                resolve({
                    errCode: -1,
                    message: "data is not found !"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allcode = await db.Allcodes.findAll({
                where: { type: typeInput },
                raw: false
            });

            res.errCode = 0;
            res.data = allcode;

            resolve(res);
        } catch (e) {
            console.error("Error in getAllCodeService: ", e);
            reject({
                errCode: -1,
                errMessage: "Error from server",
            });
        }
    });
};
const handleGetUser = async (current, pageSize, filters = {}) => {
    current = parseInt(+current, 10) || 1;
    pageSize = parseInt(+pageSize, 10) || 10;
    if (+current < 1) current = 1;
    if (+pageSize < 1) pageSize = 10;

    const skip = (current - 1) * pageSize;

    // --- Xử lý điều kiện lọc ---
    let whereCondition = {};
    let classIncludeCondition = {};

    // Lọc theo từ khóa (tên hoặc email)
    if (filters.keyword) {
        whereCondition = {
            [Op.or]: [
                { name: { [Op.like]: `%${filters.keyword}%` } },
                { email: { [Op.like]: `%${filters.keyword}%` } },
            ],
        };
    }

    // Lọc theo lớp
    if (filters.class_id) {
        classIncludeCondition = {
            id: filters.class_id,
        };
    }

    try {
        const { count, rows } = await db.Users.findAndCountAll({
            where: whereCondition,
            offset: skip,
            limit: pageSize,
            raw: false,
            nest: true,
            attributes: ["id", "name", "email"],
            include: [
                {
                    model: db.Class,
                    as: "classes",
                    attributes: ["id", "class_name", "class_code"],
                    through: { attributes: [] },
                    where: Object.keys(classIncludeCondition).length
                        ? classIncludeCondition
                        : undefined,
                    required: true, // nếu có filter class thì buộc phải match
                },
            ],
        });
        const formattedData = rows.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            classes: Array.isArray(user.classes)
                ? user.classes.map((cls) => ({
                    id: cls.id,
                    class_name: cls.class_name,
                    class_code: cls.class_code,
                }))
                : [
                    {
                        id: user.classes.id,
                        class_name: user.classes.class_name,
                        class_code: user.classes.class_code,
                    },
                ],
        }));
        return {
            data: formattedData,
            pagination: {
                total: count,
                current,
                pageSize
            }
        };
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
};
const handleGetClass = async () => {
    try {
        const classes = await db.Class.findAll({
            attributes: ["id", "class_name", "class_code"],
            raw: true,
        });
        return classes;
    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
};
const handleCreateStudent = async (data) => {
    if (!data.email || !data.password || !data.class_id) {
        throw new AppError("Missing required information", 400);
    }
    try {
        const existingUser = await checkUserEmail(data.email);
        if (existingUser) {
            throw new AppError("Email already exists !", 400);
        }
        const hashedPassword = await hashUserPassWord(data.password);
        const newUser = await db.Users.create({
            email: data.email,
            password: hashedPassword,
            role_id: "R2",
        });
        const classes = await db.Class.findOne({
            where: { id: data.class_id },
        });
        if (!classes) {
            throw new AppError("Class not found !", 400);
        }
        await db.Class_Student.create({
            student_id: newUser.id,
            class_id: +data.class_id,
        })
        return newUser.id;

    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
}
const handleImportStudents = async (data) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        throw new AppError("Invalid input data", 400);
    }
    const transaction = await db.sequelize.transaction();
    try {
        const results = [];

        for (const student of data) {
            // ✅ Validate từng record
            if (
                !student.email ||
                !student.password ||
                !student.class_id
            ) {
                throw new AppError("Missing required fields in student data", 400);
            }

            // ✅ Kiểm tra email đã tồn tại chưa
            const existingUser = await checkUserEmail(student.email);
            if (existingUser) {
                throw new AppError(`Email ${student.email} already exists`, 400);
            }

            // ✅ Kiểm tra class tồn tại
            const classExists = await db.Class.findOne({ where: { id: student.class_id } });
            if (!classExists) {
                throw new AppError(`Class with ID ${student.class_id} not found`, 400);
            }

            // ✅ Hash password
            const hashedPassword = await hashUserPassWord(student.password);

            // ✅ Tạo user (role_id: R2 - Student)
            const newUser = await db.Users.create(
                {
                    name: student.email,
                    email: student.email,
                    password: hashedPassword,
                    role_id: "R2",
                },
                { transaction }
            );

            // ✅ Liên kết class - student
            await db.Class_Student.create(
                {
                    student_id: newUser.id,
                    class_id: +student.class_id,
                },
                { transaction }
            );

            results.push({
                id: newUser.id,
                email: newUser.email,
                class_id: +student.class_id,
            });
        }

        await transaction.commit();
        return results.length;

    } catch (error) {
        await transaction.rollback();
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
}
const handleUpdateStudent = async (data) => {
    if (!data.id || !data.email || !data.class_id) {
        throw new AppError("Invalid input data", 400);
    }

    const transaction = await db.sequelize.transaction();

    try {
        const user = await db.Users.findOne({
            where: { id: data.id },
            transaction
        });

        if (!user) {
            throw new AppError("User not found!", 404);
        }

        // Kiểm tra class tồn tại
        const classes = await db.Class.findOne({
            where: { id: data.class_id },
            transaction
        });

        if (!classes) {
            throw new AppError("Class not found!", 400);
        }

        // Xóa liên kết class cũ (nếu có)
        await db.Class_Student.destroy({
            where: { student_id: user.id },
            transaction
        });

        // Thêm liên kết class mới
        await db.Class_Student.create(
            {
                student_id: user.id,
                class_id: +data.class_id,
            },
            { transaction }
        );

        await transaction.commit();
        return user.id
    } catch (error) {
        await transaction.rollback();
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
};
const handleGetStudent = async (id) => {
    if (!id) {
        throw new AppError("missing id student !", 400)
    }
    try {
        const student = await db.Users.findOne({
            where: { id },
            attributes: ['email', 'password'],
            include: [
                {
                    model: db.Class,
                    as: "classes",
                    attributes: ["id", "class_name", "class_code"],
                    through: { attributes: [] },
                },
            ],
        })
        const formattedData = {
            email: student?.email,
            class_id: student?.classes[0]?.id
        }
        console.log('Check formattedData: ', formattedData)
        return formattedData;

    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
}
const handleDeleteStudent = async (id) => {
    if (!id) {
        throw new AppError("Missing student ID!", 400);
    }

    const transaction = await db.sequelize.transaction();
    try {
        const student = await db.Users.findOne({
            where: { id },
            transaction,
        });

        if (!student) {
            throw new AppError("Student not found!", 404);
        }

        // 1️⃣ Xóa quan hệ lớp - sinh viên trước
        await db.Class_Student.destroy({
            where: { student_id: id },
            transaction,
        });

        // 2️⃣ Xóa sinh viên
        await student.destroy({ transaction });

        // 3️⃣ Commit
        await transaction.commit();
        return { success: true, message: "Student deleted successfully" };

    } catch (error) {
        await transaction.rollback();
        if (error instanceof AppError) throw error;
        throw new AppError("Database error: " + error.message, 500);
    }
};

module.exports = {
    handleGetListCV,
    getAllCodeService,
    handleUserLogin,
    handleRegister,
    handleGetUser,
    handleGetClass,
    handleCreateStudent,
    handleImportStudents,
    handleUpdateStudent,
    handleGetStudent,
    handleDeleteStudent
}

