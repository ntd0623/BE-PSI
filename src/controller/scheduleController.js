const scheduleService = require("../services/scheduleService");
const asyncHandler = require("express-async-handler");
const scheduleController = {
    createSchedule: asyncHandler(async (req, res, next) => {
        const schedule = await scheduleService.handleCreateSchedule(req.body);
        res.status(201).json({
            success: true,
            message: "Schedule created successfully",
            data: schedule,
        });
    }),
    updateSchedule: asyncHandler(async (req, res, next) => {
        const schedule = await scheduleService.handleUpdateSchedule(req.body);
        res.status(200).json({
            success: true,
            message: "Schedule updated successfully",
            data: schedule,
        });
    }),
    getSchedule: asyncHandler(async (req, res, next) => {
        const { current, pageSize, sort } = req.query;
        const schedule = await scheduleService.handleGetSchedule(current, pageSize, sort);
        res.status(200).json({
            success: true,
            message: "Get schedule successfully",
            data: schedule,
        });
    }),
    getScheduleByExamCode: asyncHandler(async (req, res, next) => {
        const schedule = await scheduleService.handleGetScheduleByExamCode(req.query.exam_code, req.query.user);
        res.status(200).json({
            success: true,
            message: "Get information quiz successfully",
            data: schedule,
        });
    }),
    getScheduleById: asyncHandler(async (req, res, next) => {
        const schedule = await scheduleService.handleGetScheduleById(req.query.id);
        res.status(200).json({
            success: true,
            message: "Get schedule successfully",
            data: schedule,
        });
    }),
    deleteSchedule: asyncHandler(async (req, res, next) => {
        const schedule = await scheduleService.handleDeleteSchedule(req.query.id);
        res.status(200).json({
            success: true,
            message: "Delete schedule successfully",
            data: schedule,
        });
    }),
};

module.exports = scheduleController;
