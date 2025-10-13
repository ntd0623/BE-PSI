const asyncHandler = require("express-async-handler");
const classService = require("../services/classService");

const classController = {
    createClass: asyncHandler(async (req, res, next) => {
        const classes = await classService.handleCreateClass(req.body);
        res.status(201).json({
            success: true,
            message: "Class created successfully",
            data: classes,
        });
    }),
    updateClass: asyncHandler(async (req, res, next) => {
        const classes = await classService.handleUpdateClass(req.body);
        res.status(201).json({
            success: true,
            message: "Class updated successfully",
            data: classes,
        });
    }),
    deleteClass: asyncHandler(async (req, res, next) => {
        const classes = await classService.handleDeleteClass(req.query.id);
        res.status(201).json({
            success: true,
            message: "Class deleted successfully",
            data: classes,
        });
    }),
    getClasses: asyncHandler(async (req, res, next) => {
        const { current, pageSize } = req.query;
        const classes = await classService.handleGetClasses(current, pageSize);
        res.status(200).json({
            success: true,
            message: "Get classes successfully",
            data: classes,
        });
    }),
    getClassById: asyncHandler(async (req, res, next) => {
        const { id } = req.query;
        const classes = await classService.handleGetClassById(id);
        res.status(200).json({
            success: true,
            message: "Get class by id successfully",
            data: classes,
        });
    }),

};

module.exports = classController;