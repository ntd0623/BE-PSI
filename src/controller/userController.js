const userService = require("../services/userService.js");
const cvService = require("../services/cvService.js");
const asyncHandler = require("express-async-handler");

let getAllStudentByCV = async (req, res) => {
    try {
        let { status_cv, batch_id, page, limit } = req.query;
        const data = await cvService.handleGetCV({
            status_cv,
            batch_id,
            page,
            limit,
        });

        return res.status(200).json(data);
    } catch (e) {
        console.error("Error from server!", e);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
};

let getAllCodes = async (req, res) => {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
};

// Login

let login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let userData = await userService.handleUserLogin(email, password);
    if (userData.errCode === 0) {
        res.cookie("TOKEN_JWT", userData.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
        });
    }
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

const getUsers = asyncHandler(async (req, res) => {
    const { current, pageSize, ...filters } = req.query;
    const users = await userService.handleGetUser(current, pageSize, filters);
    res.status(200).json(users);
});

const getClassForStudent = asyncHandler(async (req, res) => {
    const classes = await userService.handleGetClass();
    res.status(200).json({
        success: true,
        message: "Get classes successful",
        data: classes,
    });
});
const createStudent = asyncHandler(async (req, res) => {
    const student = await userService.handleCreateStudent(req.body);
    res.status(200).json({
        success: true,
        message: "create student successful",
        data: student,
    });
});
const importStudents = asyncHandler(async (req, res) => {
    const student = await userService.handleImportStudents(req.body);
    res.status(200).json({
        success: true,
        message: "import student successful",
        data: student,
    });
});
const updateStudent = asyncHandler(async (req, res) => {
    const student = await userService.handleUpdateStudent(req.body);
    res.status(200).json({
        success: true,
        message: "update student successful",
        data: student,
    });
})
const getStudentById = asyncHandler(async (req, res) => {
    const student = await userService.handleGetStudent(req.query.id);
    res.status(200).json({
        success: true,
        message: "get student successful",
        data: student,
    });
})
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await userService.handleDeleteStudent(req.query.id);
    res.status(200).json({
        success: true,
        message: "delete student successful",
        data: student,
    });
})

module.exports = {
    getAllStudentByCV,
    getAllCodes,
    login,
    register,
    getUsers,
    getClassForStudent,
    createStudent,
    importStudents,
    updateStudent,
    getStudentById,
    deleteStudent
}