const cvService = require("../services/cvService.js");

// get list cv
const getCV = async (req, res) => {
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

// create cv
const upsertCV = async (req, res) => {
    try {
        const data = await cvService.handleUpsertCV(req.body);
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
        const { id, status_cv, page, limit } = req.query
        const cv = await cvService.handleGetDetailCV({
            id,
            status_cv,
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
const updatestatus_cv = async (req, res) => {
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

const deleteCv = async (req, res) => {
    try {
        const message = await cvService.handleDeleteCV(req.query.id);
        return res.status(200).json(message)
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).json({
            errCode: 1,
            message: "Error from server!",
        });
    }

}


module.exports = {
    getCV,
    upsertCV,
    getDetailCvByIdUser,
    updatestatus_cv,
    getCVByStudentIDAndCvID,
    deleteCv
};
