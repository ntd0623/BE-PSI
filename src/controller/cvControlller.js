const cvService = require("../services/cvService.js");

// get list cv
const getCV = async (req, res) => {
    try {
        let { statusCv, batchID, page, limit } = req.query;
        const data = await cvService.handleGetCV({
            statusCv,
            batchID,
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

// create cv
const createCV = async (req, res) => {
    try {
        const data = await cvService.handleCreateCV(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.error("Error: ", e);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
};

// get detail Cv By Id User
const getDetailCvByIdUser = async (req, res) => {
    try {
        const { id, statusCv, page, limit } = req.query
        const cv = await cvService.handleGetDetailCV({
            id,
            statusCv,
            page,
            limit
        });
        return res.status(200).json(cv);
    } catch (e) {
        console.error("Error: ", e);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
};

// update status CV
const updateStatusCV = async (req, res) => {
    try {
        const data = await cvService.handleUpdateCV(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.error("Error: ", e);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
};

const getCVByStudentIDAndCvID = async (req, res) => {
    const data = await cvService.handleGetCVByStudentAndCV({
        studentID: req.query.studentID,
        cvID: req.query.cvID
    });
    return res.status(200).json(data);
}

module.exports = {
    getCV,
    createCV,
    getDetailCvByIdUser,
    updateStatusCV,
    getCVByStudentIDAndCvID
};
