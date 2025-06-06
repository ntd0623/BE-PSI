import { where } from "sequelize";
import db from "../models/index.js";

//handle get CV submitted
let handleGetCV = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Cvs.findAll({
                where: { statusCv: "CV1" },
                include: [
                    {
                        model: db.Users,
                        attributes: ["fullName", "email", "studentID", "school_name", "major", "year"],
                    }
                ],
                raw: true,
                nest: true
            });
            console.log("Check data: ", data)
            resolve({
                errCode: 0,
                data: data
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
                message: `Missing ${field} !`
            };
        }
    }

    return {
        isValid: false,
        message: "OK"
    };
};
// handle create CV
let handleCreateCV = (input) => {
    return new Promise(async (resolve, reject) => {
        try {

            let { isValid, message } = checkValidate(input, ["userID", "file_path", "submitted_date"]);
            if (isValid) {
                resolve({
                    errCode: 2,
                    message: message
                })
            } else {
                await db.Cvs.create({
                    userID: input.userID,
                    file_path: input.file_path,
                    statusCv: "CV1",
                    submission_date: input.submission_date,
                })
                resolve({
                    errCode: 0,
                    message: "Create CV successfully "
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// handle get detail Cv
let handleGetDetailCV = (inputID) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputID) {
                resolve({
                    errCode: 2,
                    message: "Missing inputID !"
                })
            } else {
                let data = await db.Cvs.findOne({
                    where: { userID: inputID },
                    include: [
                        {
                            model: db.Users,
                            attributes: ["fullName", "email", "studentID", "school_name", "major", "year"],
                        }
                    ],
                })
                if (data) {
                    resolve({
                        errCode: 0,
                        data: data
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

// handle update cv
let handleUpdateCV = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { isValid, message } = checkValidate(input, ["userID", "statusCv"]);
            if (isValid) {
                resolve({
                    errCode: 2,
                    message: message
                })
            } else {
                let data = await db.Cvs.findOne({
                    where: { userID: input.userID },
                })
                if (data) {
                    await data.update({
                        statusCv: input.statusCv
                    })
                    resolve({
                        errCode: 0,
                        message: "update Cv successfully !"
                    })
                } else {
                    resolve({
                        errCode: -1,
                        message: "Cv not found !"
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

export const cvService = { handleGetCV, handleCreateCV, handleGetDetailCV, handleUpdateCV }