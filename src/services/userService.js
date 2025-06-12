const db = require("../models/index.js");
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
    getAllCodeService
}

