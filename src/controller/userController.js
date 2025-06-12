const userService = require("../services/userService.js");
let getAllStudentByCV = async (req, res) => {
    try {
        let data = await userService.handleGetListCV();
        return res.status(200).json(data)
    } catch (e) {
        console.error("Error from server!", e);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
}

let getAllCodes = async (req, res) => {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
};
module.exports = {
    getAllStudentByCV,
    getAllCodes
}