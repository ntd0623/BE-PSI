const db = require("../models");
const AppError = require("../../errors");
const { where } = require("sequelize");
const { Op, fn, col } = require("sequelize");
const dayjs = require("dayjs");
const checkScheduleExists = async (quiz_id, start_time, end_time, excludeId = null) => {
    const where = {
        quiz_id,
        start_time,
        end_time
    };

    if (excludeId) {
        where.id = { [db.Sequelize.Op.ne]: excludeId };
    }

    const schedule = await db.Quizzes_Schedules.findOne({ where });
    return !!schedule;
};
const checkExamCode = async (exam_code, excludeId = null) => {
    const where = { exam_code };
    if (excludeId) {
        where.id = { [db.Sequelize.Op.ne]: excludeId };
    }
    const schedule = await db.Quizzes_Schedules.findOne({
        where
    })
    return !!schedule;

}
const checkClassExists = async (class_id) => {
    const classes = await db.Class.findOne({
        where: { id: class_id }
    })
    return !!classes
}
const scheduleService = {
    handleCreateSchedule: async (data) => {
        if (!data.quiz_id) {
            throw new AppError("quiz_id is required", 400);
        }
        if (!data.class_id) {
            throw new AppError("quiz_id is required", 400);
        }
        //Check lớp có tồn tại hay không
        const existsClass = await checkClassExists(data.class_id)
        if (!existsClass) {
            throw new AppError("class not found is required", 400);

        }
        // Validate thời gian
        if (!data.start_time || !data.end_time) {
            throw new AppError("start_time and end_time are required", 400);
        }
        if (new Date(data.start_time) >= new Date(data.end_time)) {
            throw new AppError("start_time must be before end_time", 400);
        }

        // attempt_limit
        if (data.attempt_limit && data.attempt_limit <= 0) {
            throw new AppError("attempt_limit must be greater than 0", 400);
        }

        // kiểm tra trùng lịch thi
        const exists = await checkScheduleExists(data.quiz_id, data.start_time, data.end_time);
        if (exists === true) {
            throw new AppError("schedule is already exists !", 409)
        }
        // Kiểm tra trùng mã kiểm tra
        const existsExamCode = await checkExamCode(data.exam_code);
        if (existsExamCode === true) {
            throw new AppError("Exam Code is already exists !", 409)
        }

        // Create mới
        try {
            const schedule = await db.Quizzes_Schedules.create(data);
            return schedule;
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
    handleGetSchedule: async (current = 1, pageSize = 5, sort = "lastest") => {
        try {
            const offset = (+current - 1) * +pageSize;

            const { rows, count } = await db.Quizzes_Schedules.findAndCountAll({
                limit: +pageSize,
                offset,
                order:
                    sort === "lastest"
                        ? [["start_time", "DESC"]]
                        : [[{ model: db.Quizzes, as: "quiz" }, "title", "ASC"]],
                include: [
                    {
                        model: db.Quizzes,
                        as: "quiz",
                        attributes: ["id", "title"],
                    },
                    {
                        model: db.Class,
                        as: "quiz_schedule_class",
                        attributes: ['class_name', 'class_code']
                    }
                ],
            });

            const data = rows.map((item) => {
                return {
                    id: item?.id,
                    title: item?.quiz?.title,
                    start_time: item?.start_time,
                    end_time: item?.end_time,
                    attempt_limit: item?.attempt_limit,
                    shuffle_question: item?.shuffle_question,
                    shuffle_answer: item?.shuffle_answer,
                    exam_code: item?.exam_code,
                    class_name: item?.quiz_schedule_class?.class_code
                }
            })

            return {
                data,
                pagination: {
                    total: count,
                },
            };
        } catch (err) {
            throw new AppError("Database error: " + err, 500);
        }
    },
    handleGetScheduleById: async (id) => {
        if (!id) {
            throw new AppError("ID Schedule is required", 400);
        }
        try {
            const data = await db.Quizzes_Schedules.findOne({
                where: { id }
            })
            if (!data) {
                throw new AppError("Data not found !", 404)
            } else {
                return data
            }

        } catch (error) {
            throw new AppError("Database error: " + err, 500);
        }
    },
    handleGetScheduleByExamCode: async (exam_code, user_id) => {
        if (!exam_code) {
            throw new AppError("Exam Code is required", 400);
        }
        if (!user_id) {
            throw new AppError("user not found", 400);
        }
        try {
            const data = await db.Quizzes_Schedules.findOne({
                where: where(fn("UPPER", col("exam_code")), exam_code.trim().toUpperCase()),
                include: [
                    {
                        model: db.Quizzes,
                        as: "quiz",
                        attributes: ['title', 'description', 'duration_minutes', 'number_questions']
                    }
                ]
            })
            if (!data) {
                throw new AppError("Exam code invalid !", 404)
            }
            // Check sinh viên có thuộc lớp kiểm tra không
            const checkStudent = await db.Class_Student.findOne({
                where: { student_id: user_id, class_id: data.class_id }
            })
            if (!checkStudent) {
                throw new AppError("Student not found class exam!", 404)
            }
            const now = dayjs();
            if (now.isBefore(dayjs(data.start_time))) {
                throw new AppError("Chưa đúng giờ để bắt đầu làm kiểm tra", 403);
            }
            if (now.isAfter(dayjs(data.end_time))) {
                throw new AppError("Đã qua giờ làm bài kiểm tra", 403);
            }
            const dataFormatted = {
                id: data.id,
                title: data?.quiz?.title,
                quiz_id: data?.quiz_id,
                description: data?.quiz?.description,
                duration_minutes: data?.quiz?.duration_minutes,
                number_questions: data?.quiz?.number_questions,
                exam_code: data?.exam_code,
                start_time: data?.start_time,
                end_time: data?.end_time,
                shuffle_question: data?.shuffle_question,
                shuffle_answer: data?.shuffle_answer
            };
            return dataFormatted


        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("DB Error:" + error.message);
            throw new AppError("Database error: " + error.message, 500);
        }
    },
    handleDeleteSchedule: async (id) => {
        if (!id) {
            throw new AppError("ID Schedule is required", 400);
        }
        try {
            const deletedCount = await db.Quizzes_Schedules.destroy({
                where: { id }
            });

            if (deletedCount === 0) {
                throw new AppError("Not found Schedule", 404);
            }
            return deletedCount;
        } catch (error) {
            throw new AppError("Database error: " + err, 500);
        }
    },
    handleUpdateSchedule: async (data) => {
        if (!data.quiz_id) {
            throw new AppError("quiz_id is required", 400);
        }

        // Validate thời gian
        if (!data.start_time || !data.end_time) {
            throw new AppError("start_time and end_time are required", 400);
        }
        if (new Date(data.start_time) >= new Date(data.end_time)) {
            throw new AppError("start_time must be before end_time", 400);
        }

        // attempt_limit
        if (data.attempt_limit && data.attempt_limit <= 0) {
            throw new AppError("attempt_limit must be greater than 0", 400);
        }
        // kiểm tra trùng lịch thi
        const exists = await checkScheduleExists(data.quiz_id, data.start_time, data.end_time, data.id);
        if (exists === true) {
            throw new AppError("schedule is already exists !", 409)
        }
        // Kiểm tra trùng mã kiểm tra
        const existsExamCode = await checkExamCode(data.exam_code, data.id);
        if (existsExamCode === true) {
            throw new AppError("Exam Code is already exists !", 409)
        }
        try {
            const [affected] = await db.Quizzes_Schedules.update(
                {
                    quiz_id: data.quiz_id,
                    start_time: data.start_time,
                    end_time: data.end_time,
                    attempt_limit: data.attempt_limit,
                    shuffle_question: data.shuffle_question,
                    shuffle_answer: data.shuffle_answer,
                    exam_code: data.exam_code
                },
                { where: { id: data.id } }
            );

            if (affected === 0) {
                throw new AppError("Schedule not found", 404);
            }

            return { id: data.id };
        } catch (error) {
            throw new AppError("Internal Server Error: " + error, 500)
        }
    }
};


module.exports = scheduleService;
