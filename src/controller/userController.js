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

// Login

let login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json(userData);
};

const register = async (req, res) => {
    try {
        const result = await userService.handleRegister(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Register controller error:", error);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server !"
        });
    }
};

module.exports = {
    getAllStudentByCV,
    getAllCodes,
    login,
    register
}