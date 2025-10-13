const db = require("../models");
const AppError = require("../../errors");
const { where } = require("sequelize");
const { Op, fn, col } = require("sequelize");
const dayjs = require("dayjs");
const { shuffleArray } = require("../utils/helper")
const attemptService = {
    handleCreateAttempt: async (data) => {
        if (!data) {
            throw new AppError("data not found", 400);
        }
        if (!data.user_id) {
            throw new AppError("User is required !", 400);
        }
        if (!data.quiz_id) {
            throw new AppError("Quiz is required !", 400);

        }
        if (!data.duration) {
            throw new AppError("Quiz is required !", 400);

        }
        if (!data.schedule_id) {
            throw new AppError("Schedule is required !", 400);
        }
        try {
            const existingAttempt = await db.Quiz_Attempt.findOne({
                where: {
                    user_id: data.user_id,
                    schedule_id: data.schedule_id,
                    quiz_id: data.quiz_id,
                    status: "S1"
                }
            });

            if (existingAttempt) {
                return existingAttempt
            }
            const schedule = await db.Quizzes_Schedules.findOne({
                where: { id: data.schedule_id, quiz_id: data.quiz_id },
            });

            if (!schedule) {
                throw new AppError("Không tìm thấy lịch thi cho quiz này", 404);
            }

            const now = dayjs();
            const start = dayjs(data.start_time);
            const end = dayjs(data.end_time);

            if (now.isBefore(start) || now.isAfter(end)) {
                throw new AppError("Chưa tới giờ hoặc đã hết thời gian làm bài", 400);
            }

            // Kiểm tra số lần thi
            const attemptCount = await db.Quiz_Attempt.count({
                where: { user_id: data.user_id, quiz_id: data.quiz_id, schedule_id: data.schedule_id },
            });
            if (attemptCount >= schedule.attempt_limit) {
                throw new AppError("Bạn đã hết lượt làm bài", 400);
            }
            // Tạo attempt mới
            const newAttempt = await db.Quiz_Attempt.create({
                user_id: data.user_id,
                quiz_id: data.quiz_id,
                start_time: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                status: data?.status || "S1",
                schedule_id: data.schedule_id,
                duration: +data?.duration
            });
            // Lấy danh sách câu hỏi và tạo quiz_question_attempt
            let questions = await db.Quizzes_Questions.findAll({
                where: { quiz_id: data.quiz_id },
                order: [['id', 'ASC']],
                raw: true,
            });
            console.log("Check question: ", questions)
            // Random câu hỏi nếu được phép
            if (schedule.shuffle_question) {
                questions = shuffleArray(questions);
            }

            // Giới hạn số lượng câu hỏi (theo quiz)
            const quiz = await db.Quizzes.findOne({
                where: { id: data.quiz_id }
            });
            if (!quiz) {
                throw new AppError("Quiz not found", 404);
            }
            if (quiz?.number_questions) {
                questions = questions.slice(0, quiz.number_questions);
            }

            // Tạo order index cho từng câu hỏi
            const questionAttempts = questions.map((q, index) => ({
                question_id: q.id,
                attempt_id: newAttempt.id,
                order_index: index,
                createdAt: new Date(),
                updatedAt: new Date()
            }));

            const quiz_attempt = await db.Quiz_Question_Attempt.bulkCreate(questionAttempts);
            if (!quiz_attempt) {
                throw new AppError("Tạo câu hỏi trong bài thi thất bại", 500);
            }
            return newAttempt;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }
            console.error("DB Error:", error);
            throw new AppError("Database error: " + error.message, 500);
        }
    },
    handleAutoSave: async (data) => {
        if (!data.attempt_id) throw new AppError("attempt_id is required", 400);
        if (!Array.isArray(data.answers)) throw new AppError("answers must be an array", 400);

        const transaction = await db.sequelize.transaction();

        try {
            // Lock attempt row
            const attempt = await db.Quiz_Attempt.findOne({
                where: { id: data.attempt_id },
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!attempt) throw new AppError("Attempt not found", 404);
            if (attempt.status === "S2") throw new AppError("Bài thi đã được nộp!", 400);

            const now = new Date();
            const expireTime = new Date(attempt.start_time.getTime() + attempt.duration * 60 * 1000);

            // Nếu đã quá thời gian hết hạn → không cho lưu
            if (now >= expireTime) {
                console.log("⏰ Hết thời gian - tự động nộp bài!");

                // Gọi lại logic nộp bài
                await module.exports.handleSubmitQuiz({
                    attempt_id: data.attempt_id,
                    user_id: data.user_id,
                    answers: data.answers,
                    total_question: data.total_question,
                    end_time: now,
                    time_left: 0,
                });

                await transaction.rollback(); // rollback transaction autosave
                throw new AppError("Hết thời gian, hệ thống đã tự động nộp bài!", 400);
            }


            // Tính lại time_left chuẩn theo server
            const newTimeLeft = Math.max(
                Math.floor((expireTime - now) / 1000), // còn bao nhiêu giây
                0
            );

            // Lưu từng câu trả lời
            for (const answer of data.answers) {
                if (answer.answer_ids.length === 0) continue; // Skip câu chưa trả lời

                // Xóa câu trả lời cũ
                await db.Quizzes_Selected_Answers.destroy({
                    where: {
                        attempt_id: data.attempt_id,
                        question_id: answer.question_id,
                    },
                    transaction,
                });

                // Lấy correct answers để check
                const correctAnswers = await db.Quizzes_Answers.findAll({
                    where: {
                        question_id: answer.question_id,
                        is_correct: true,
                    },
                    attributes: ["id"],
                    raw: true,
                });

                const correctIds = correctAnswers.map((a) => a.id);

                // Insert câu trả lời mới
                for (const answerId of answer.answer_ids) {
                    await db.Quizzes_Selected_Answers.create(
                        {
                            answer_id: answerId,
                            question_id: answer.question_id,
                            attempt_id: data.attempt_id,
                            is_correct: correctIds.includes(answerId),
                        },
                        { transaction }
                    );
                }
            }

            // Cập nhật time_left trong attempt
            await attempt.update(
                {
                    time_left: parseFloat((newTimeLeft / 60).toFixed(2)), // phút
                    updatedAt: new Date(),
                },
                { transaction }
            );

            await transaction.commit();
            return { success: true, message: "Đã lưu tiến trình", time_left: newTimeLeft };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof AppError) throw error;
            throw new AppError("Database error: " + error.message, 500);
        }
    },

    handleGetAttempt: async (schedule_id, attempt_id) => {
        if (!schedule_id) throw new AppError("schedule is required !", 400);
        if (!attempt_id) throw new AppError("attempt is required !", 400);

        try {
            // 1️⃣ Lấy schedule
            const schedule = await db.Quizzes_Schedules.findOne({
                where: { id: schedule_id },
            });
            if (!schedule) throw new AppError("Schedule not found", 404);

            const now = dayjs();
            const start = dayjs(schedule.start_time);
            const end = dayjs(schedule.end_time);

            if (now.isBefore(start) || now.isAfter(end)) {
                throw new AppError("Chưa tới giờ hoặc đã hết thời gian làm bài", 400);
            }

            // 2️⃣ Lấy attempt
            const attempt = await db.Quiz_Attempt.findOne({
                where: { id: attempt_id, schedule_id },
            });
            if (!attempt) throw new AppError("Attempt not found", 404);

            // 3️⃣ Lấy danh sách câu hỏi + đáp án
            const questionAttempts = await db.Quiz_Question_Attempt.findAll({
                where: { attempt_id: attempt.id },
                include: [
                    {
                        model: db.Quizzes_Questions,
                        as: "question",
                        include: [
                            {
                                model: db.Quizzes_Answers,
                                as: "answers",
                                attributes: ["id", "content", "question_id"],
                            },
                            {
                                model: db.Quizzes_Question_Images,
                                as: "images_question",
                                attributes: ["image", "caption"],
                            },
                        ],
                    },
                ],
                order: [["order_index", "ASC"]],
            });

            if (!questionAttempts || questionAttempts.length === 0) {
                throw new AppError("No questions found for this attempt", 404);
            }

            // ✅ Convert sang plain object TRƯỚC KHI shuffle
            const plainQuestionAttempts = questionAttempts.map(qa => qa.get({ plain: true }));

            // 4️⃣ Nếu schedule bật shuffle_answer → đảo thứ tự answers
            if (!!schedule.shuffle_answer) {
                for (const qa of plainQuestionAttempts) {
                    if (qa.question && qa.question.answers?.length > 0) {
                        console.log("Before shuffle:", qa.question.answers.map(a => a.id));
                        qa.question.answers = shuffleArray(qa.question.answers);
                        console.log("After shuffle:", qa.question.answers.map(a => a.id));
                    }
                }
            }

            console.log("Check questionAttempts: ", plainQuestionAttempts);
            return {
                questions: plainQuestionAttempts,
                attempt: {
                    id: attempt.id,
                    start_time: attempt.start_time,
                    duration: attempt.duration, // phút
                    time_left: attempt.time_left, // giây hoặc phút tùy DB
                    status: attempt.status,
                },
                schedule: {
                    id: schedule.id,
                    start_time: schedule.start_time,
                    end_time: schedule.end_time,
                },
                server_now: now.toDate(),
            };
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Database error: " + error.message, 500);
        }
    },

    handleSubmitQuiz: async (data) => {
        if (!data.attempt_id) throw new AppError("attempt_id is required", 400);
        if (!Array.isArray(data.answers)) throw new AppError("answers must be an array", 400);

        const transaction = await db.sequelize.transaction();

        try {
            const attempt = await db.Quiz_Attempt.findOne({
                where: { id: data.attempt_id },
                lock: transaction.LOCK.UPDATE,
                transaction,
            });

            if (!attempt) throw new AppError("Attempt not found", 404);
            if (attempt.status === "S2") throw new AppError("Bài thi đã được nộp!", 400);
            if (attempt.user_id !== data.user_id)
                throw new AppError("Bạn không có quyền nộp bài này!", 403);

            // Xóa tất cả câu trả lời cũ
            await db.Quizzes_Selected_Answers.destroy({
                where: { attempt_id: data.attempt_id },
                transaction,
            });

            let totalCorrect = 0;

            // Lưu câu trả lời và tính điểm
            for (const answer of data.answers) {
                // Lấy danh sách đáp án đúng
                const correctAnswers = await db.Quizzes_Answers.findAll({
                    where: {
                        question_id: answer.question_id,
                        is_correct: true,
                    },
                    attributes: ["id"],
                    raw: true,
                    transaction,
                });

                const correctIds = correctAnswers.map((a) => a.id).sort();
                const userIds = [...(answer.answer_ids || [])].sort();

                // Kiểm tra đúng toàn bộ
                const isFullyCorrect =
                    JSON.stringify(correctIds) === JSON.stringify(userIds);

                if (isFullyCorrect) totalCorrect++;

                // ✅ Nếu người dùng KHÔNG chọn đáp án nào
                if (userIds.length === 0) {
                    await db.Quiz_Review.create(
                        {
                            attempt_id: attempt.id,
                            question_id: answer.question_id,
                            selected_answer: null,
                            is_correct: false,
                        },
                        { transaction }
                    );
                    continue;
                }

                // ✅ Nếu người dùng có chọn -> xử lý như bình thường
                for (const answerId of userIds) {
                    const isCorrect = correctIds.includes(answerId);

                    await db.Quizzes_Selected_Answers.create(
                        {
                            answer_id: answerId,
                            question_id: answer.question_id,
                            attempt_id: data.attempt_id,
                            is_correct: isCorrect,
                        },
                        { transaction }
                    );

                    await db.Quiz_Review.create(
                        {
                            attempt_id: attempt.id,
                            question_id: answer.question_id,
                            selected_answer: answerId,
                            is_correct: isCorrect,
                        },
                        { transaction }
                    );
                }
            }


            // Tính điểm
            const score = (totalCorrect / +data.total_question) * 10;

            // Update attempt
            await attempt.update(
                {
                    end_time: dayjs(data.end_time).format("YYYY-MM-DD HH:mm:ss"),
                    status: "S2", // Completed
                    time_left: Math.ceil(data.time_left).toFixed(2) || 0,
                },
                { transaction }
            );

            await db.Quizzes_Results.create({
                user_id: data.user_id,
                quiz_id: attempt.quiz_id,
                attempt_id: attempt.id,
                total_score: score.toFixed(2),
                submitted_at: dayjs(data.end_time).format("YYYY-MM-DD HH:mm:ss"),
                total_correct: totalCorrect,
                total_question: data.total_question,
                duration_used: dayjs(data.end_time).diff(dayjs(attempt.start_time), 'minutes'),
            }, {
                transaction
            })

            await transaction.commit();

            return {
                success: true,
                total_correct: totalCorrect,
                total_question: data.total_question,
                score: score.toFixed(2),
            };
        } catch (error) {
            await transaction.rollback();
            if (error instanceof AppError) throw error;
            throw new AppError("Database error: " + error.message, 500);
        }
    },
    handleGetResultAttempt: async (current, pageSize, filters = {}) => {
        try {
            current = parseInt(+current, 10) || 1;
            pageSize = parseInt(+pageSize, 10) || 10;
            if (+current < 1 || !current) current = 1;
            if (+pageSize < 1 || !pageSize) pageSize = 10;
            let whereCondition = {};
            const skip = (current - 1) * pageSize;
            if (filters.quiz_id) {
                whereCondition.quiz_id = filters.quiz_id;
            }
            let attemptCondition = {};
            if (filters.status) {
                attemptCondition.status = filters.status;
            }
            let classCondition = {};
            if (filters.class_id) {
                classCondition.id = filters.class_id;
            }
            const { count, rows } = await db.Quizzes_Results.findAndCountAll({
                distinct: true,
                where: whereCondition,
                limit: pageSize,
                offset: skip,
                order: [['createdAt', 'ASC']],
                include: [
                    {
                        model: db.Quizzes,
                        as: "quiz",
                        attributes: ["id", "title"]
                    },
                    {
                        model: db.Users,
                        as: 'user',
                        attributes: ["id", 'name', 'email'],
                        include: [
                            {
                                model: db.Class,
                                as: "classes",
                                attributes: ['class_name', 'class_code', 'id'],
                                through: { attributes: [] },
                                where: classCondition,
                                required: true,
                            }
                        ]
                    },
                    {
                        model: db.Quiz_Attempt,
                        as: "attempt",
                        attributes: ["id", "start_time", "end_time", "status"],
                        include: [
                            {
                                model: db.Allcodes,
                                as: "status_attempt",
                                attributes: ["value_vi", "value_en"],
                            }
                        ],
                        where: attemptCondition

                    }
                ]
            })
            const data = rows.map((item) => {
                return {
                    id: item?.id,
                    user_id: item?.user_id,
                    name: item.user.name ? item.user.name : item.user.email,
                    quiz_title: item?.quiz?.title,
                    start_time: item?.attempt?.start_time,
                    submitted_at: item?.submitted_at,
                    total_score: item?.total_score,
                    total_correct: item?.total_correct,
                    total_question: item?.total_question,
                    duration_used: item?.duration_used,
                    status: item?.attempt?.status,
                    class: item?.user?.classes[0]?.class_code
                }
            });
            return {
                data,
                pagination: {
                    total: count,
                    current,
                    pageSize
                }
            }

        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Database error: " + error.message, 500);
        }
    },
    handleGetAllQuiz: async () => {
        try {
            const quizzes = await db.Quizzes.findAll({
                attributes: ['id', 'title'],
                order: [['createdAt', 'ASC']],
            });
            if (!quizzes) {
                throw new AppError("No quizzes found", 404);
            }
            return quizzes;
        } catch (error) {
            if (error instanceof AppError) throw error;
            throw new AppError("Database error: " + error.message, 500);
        }
    },
    handleExportResult: async (class_id, quiz_id) => {
        try {
            if (!class_id || !quiz_id)
                throw new Error("Thiếu class_id hoặc quiz_id");

            const results = await db.Quizzes_Results.findAll({
                include: [
                    {
                        model: db.Users,
                        as: "user",
                        attributes: ["id", "name", "email"],
                        include: [
                            {
                                model: db.Class,
                                as: "classes",
                                attributes: ["id", "class_name", "class_code"],
                                through: { attributes: [] },
                                where: { id: class_id },
                            },
                        ],
                    },
                    {
                        model: db.Quizzes,
                        as: "quiz",
                        attributes: ["id", "title"],
                        where: { id: quiz_id },
                    },
                ],
                attributes: [
                    "id",
                    "total_score",
                    "total_correct",
                    "total_question",
                    "submitted_at",
                ],
                order: [["submitted_at", "DESC"]],
            });

            // Chuẩn hóa dữ liệu để FE dễ export
            const data = results.map((r) => ({
                user_id: r.user?.id,
                name: r.user.name ? r.user.name : r.user.email,
                class: r.user?.classes?.[0]?.class_code,
                total_score: r.total_score,
                total_correct: r.total_correct,
                total_question: r.total_question,
                submitted_at: r.submitted_at,
            }));

            return data;
        } catch (error) {
            throw new Error("Lỗi truy vấn dữ liệu: " + error.message);
        }
    }

};



module.exports = attemptService;
