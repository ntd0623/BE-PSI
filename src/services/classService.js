const db = require("../models");
const AppError = require("../../errors");
const { where } = require("sequelize");
const { Op, fn, col } = require("sequelize");
const dayjs = require("dayjs");
// check trùng lớp
const checkClassessExists = async (class_code, excludeId = null) => {
    const where = { class_code };

    // Nếu đang update thì loại trừ chính nó
    if (excludeId) {
        where.id = { [db.Sequelize.Op.ne]: excludeId };
    }

    const existsClass = await db.Class.findOne({ where });
    return !!existsClass;
}
const classService = {
    handleCreateClass: async (data) => {
        if (!data.class_code) {
            throw new AppError("Class id is required", 400);
        }
        // Validate thời gian
        if (!data.class_name) {
            throw new AppError("class name is required", 400);
        }

        // kiểm tra trùng lớp
        const exists = await checkClassessExists(data.class_code);
        if (exists === true) {
            throw new AppError("classes is already exists !", 409)
        }

        // Create mới
        try {
            const classes = await db.Class.create(data);
            return classes.id;
        } catch (err) {
            if (err.name === "SequelizeValidationError") {
                throw new AppError(err.errors[0].message, 400);
            }
            if (err.name === "SequelizeUniqueConstraintError") {
                throw new AppError("Duplicate field value: " + err, 409);
            }
            throw new AppError("Database error: " + err, 500);
        }
    },
    handleUpdateClass: async (data) => {
        if (!data.class_code) {
            throw new AppError("Class code id is required", 400);
        }
        if (!data.class_name) throw new AppError("Class name id is required", 400);
        if (!data.id) throw new AppError("Class id is required", 400);
        // Kiểm tra trùng lớp
        const existsClasses = await checkClassessExists(data.class_code, data.id);
        if (existsClasses === true) {
            throw new AppError("Classes is already exists !", 409)
        }
        try {
            const classes = await db.Class.findOne({
                where: { id: data.id },
            })
            if (!classes) {
                throw new AppError("Classes not found", 404);
            }
            await db.Class.update({
                class_code: data.class_code,
                class_name: data.class_name,
            }, {
                where: { id: data.id }
            });
            return classes.id;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new AppError(error.errors[0].message, 400);
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new AppError("Duplicate field value: " + error, 409);
            }
            throw new AppError("Database error: " + error, 500);
        }
    },
    handleDeleteClass: async (id) => {
        if (!id) throw new AppError("Class id is required", 400);
        try {
            const classes = await db.Class.findOne({
                where: { id }
            })
            if (!classes) {
                throw new AppError("Classes not found", 404);
            }
            await db.Class.destroy({
                where: { id }
            })
            return classes.id;
        } catch (error) {
            if (err.name === "SequelizeValidationError") {
                throw new AppError(err.errors[0].message, 400);
            }
            if (err.name === "SequelizeUniqueConstraintError") {
                throw new AppError("Duplicate field value: " + err, 409);
            }
            throw new AppError("Database error: " + err, 500);
        }
    },
    handleGetClasses: async (current = 1, pageSize = 10) => {
        current = Number.isFinite(+current) ? parseInt(current, 10) : 1;
        pageSize = Number.isFinite(+pageSize) ? parseInt(pageSize, 10) : 10;
        if (current <= 0) current = 1;
        if (pageSize <= 0) pageSize = 10;
        const offset = (current - 1) * pageSize;
        try {
            const { count, rows } = await db.Class.findAndCountAll({
                offset: offset,
                limit: pageSize,
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: db.Users,
                        as: "students",
                        through: { attributes: [] },
                        attributes: ["id", "name", "email"]
                    }
                ]
            });
            const formatData = rows.map((item) => {
                return {
                    id: item.id,
                    class_code: item.class_code,
                    class_name: item.class_name,
                    total_student: item?.students?.length || 0,
                };
            });
            return {
                data: formatData,
                pagination: {
                    total: count,
                    pageSize: pageSize,
                    current: current
                }
            }
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new AppError(error.errors[0].message, 400);
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new AppError("Duplicate field value: " + error, 409);
            }
            throw new AppError("Database error: " + error, 500);
        }

    },
    handleGetClassById: async (id) => {
        if (!id) throw new AppError("Class id is required", 400);
        try {
            const classes = await db.Class.findOne({
                where: { id },
            });
            if (!classes) {
                throw new AppError("Classes not found", 404);
            }
            return classes;
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                throw new AppError(error.errors[0].message, 400);
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new AppError("Duplicate field value: " + error, 409);
            }
            throw new AppError("Database error: " + error, 500);
        }
    },
};


module.exports = classService;
