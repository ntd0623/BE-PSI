const attemptService = require("../services/attemptService");
const asyncHandler = require("express-async-handler");
const attemptController = {
    createAttempt: asyncHandler(async (req, res, next) => {
        const attempt = await attemptService.handleCreateAttempt(req.body);
        res.status(200).json({
            success: true,
            message: "create attempt successfully",
            data: attempt,
        });
    }),
    saveSelectedAnswer: asyncHandler(async (req, res, next) => {
        const attempt = await attemptService.handleSaveSelected(req.body);
        res.status(200).json({
            success: true,
            message: "create attempt successfully",
            data: attempt,
        });
    }),
    getAttempt: asyncHandler(async (req, res, next) => {
        const { schedule_id, attempt_id } = req.query;
        const attempt = await attemptService.handleGetAttempt(schedule_id, attempt_id);
        res.status(200).json({
            success: true,
            message: "get attempt successfully",
            data: attempt,
        });
    }),
    autoSave: asyncHandler(async (req, res) => {
        try {
            const result = await attemptService.handleAutoSave(req.body);
            res.status(200).json({
                errCode: 0,
                success: true,
                message: "Auto-save successful",
                data: result,
            });
        } catch (error) {
            console.error("Auto-save error:", error);
            return res.status(error.statusCode || 500).json({
                errCode: 1,
                success: false,
                message: error.message,
            });
        }
    }),
    submitQuiz: asyncHandler(async (req, res) => {
        try {
            const result = await attemptService.handleSubmitQuiz(req.body);
            res.status(200).json({
                success: true,
                message: "Submit Quiz successful",
                data: result,
            });
        } catch (error) {
            console.error("Submit Quiz error:", error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }),
    getResultAttempt: asyncHandler(async (req, res) => {
        try {
            const { current, pageSize, ...filters } = req.query;
            const result = await attemptService.handleGetResultAttempt(current, pageSize, filters);
            res.status(200).json({
                success: true,
                message: "Get result attempt successful",
                data: result,
            });
        } catch (error) {
            console.error("Get Result Attempt error:", error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }),
    getAllQuiz: asyncHandler(async (req, res) => {
        try {
            const result = await attemptService.handleGetAllQuiz();
            res.status(200).json({
                success: true,
                message: "Get all quiz successful",
                data: result,
            });
        } catch (error) {
            console.error("get all result error:", error);
            res.status(error.statusCode || 500).json({
                success: false,
                message: error.message,
            });
        }
    }),
    exportResult: asyncHandler(async (req, res) => {
        const result = await attemptService.handleExportResult(req.query.classes, req.query.quiz);
        res.status(200).json({
            success: true,
            message: "Export quiz successful",
            data: result,
        });
    })
};

module.exports = attemptController;