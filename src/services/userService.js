const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const salt = bcrypt.genSaltSync(10);
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
// check mail exists
const checkUserEmail = async (email) => {
    const user = await db.Users.findOne({ where: { email } });
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
            attributes: ["id", "name", "email", "roleID", "password", "avatar"],
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
                roleID: user.roleID,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );
        delete user.password;

        return {
            errCode: 0,
            message: "Đăng nhập thành công.",
            data: user,
            token,
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
                //         attributes: ["value_EN", "value_VI", "key"]
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
module.exports = {
    handleGetListCV,
    getAllCodeService,
    handleUserLogin
}

