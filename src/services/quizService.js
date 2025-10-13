const { where } = require("sequelize");
const db = require("../models");
const _ = require("lodash");
let checkValidate = (inputData, requiredFields) => {
    for (let i = 0; i < requiredFields.length; i++) {
        let field = requiredFields[i];
        if (inputData[field] === null || !inputData[field]) {
            return {
                isValid: true,
                message: `Missing ${field} !`,
            };
        }
    }
    return {
        isValid: false,
        message: "OK",
    };
};
const quizService = {
    handleGetQuizSets: async (role, sort) => {

        let order = [];

        if (sort === "az") {
            order = [["title", "ASC"]];
        } else if (sort === "latest") {
            order = [["createdAt", "DESC"]];
        }

        let data = await db.Quizzes.findAll({
            order: order.length ? order : undefined,
            include: [
                {
                    model: db.Quizzes_Questions,
                    as: "questions",
                    include: [
                        {
                            model: db.Quizzes_Answers,
                            as: "answers"
                        }
                    ]
                }
            ]
        });
        let statistics = "";
        if (role === "R1") {
            data = data.map((quiz) => {
                delete quiz.dataValues.questions;
                return quiz;
            });
            let result = await db.Quizzes_Results.findAll();
            // Total Time 
            const totalTime = result.reduce((sum, item) => {
                return sum + (item.duration_used || 0);
            }, 0)
            // Average Failed
            const attemptFailed = result.filter((item, index) => {
                return item.passed === false
            })
            statistics = {
                attempt: result.length,
                averageTime: result.length > 0 ? (totalTime / result.length).toFixed(2) : 0,
                unFinished: result.length > 0 ? (attemptFailed.length / result.length) * 100 : 0,
            };
        }

        if (role === "R2") {
            data = data.map((quiz) => {
                quiz.questions = quiz.questions.map((question) => {
                    delete question.dataValues.answers;
                    return question;
                });
                return quiz;
            });
        }

        if (data && data.length > 0) {
            data.map((item, index) => {
                if (item.image) {
                    item.image = Buffer.from(item.image, "base64").toString("binary");
                }
                return item;
            });
        }

        if (!data) {
            return {
                errCode: -2,
                message: "QuizSets not found !"
            }
        }

        return {
            errCode: 0,
            data: data,
            statistics
        };
    },

    handleGetQuizByID: async (inputID) => {
        if (!inputID) {
            return {
                errCode: 2,
                message: "Missing input ID !"
            }
        }
        let data = await db.Quizzes.findOne({
            where: { id: inputID },
            include: [
                {
                    model: db.Quizzes_Questions,
                    as: "questions",
                    include: [
                        {
                            model: db.Quizzes_Answers,
                            as: "answers",
                        },
                        {
                            model: db.Quizzes_Question_Images,
                            as: "images_question"
                        }
                    ]
                }
            ]
        })
        if (data && data.image) {
            data.image = Buffer.from(data.image, "base64").toString("binary");
        }
        if (data && Array.isArray(data.questions) && data.questions.length > 0) {
            data.questions = data.questions.map((item) => {
                if (item.images_question && item.images_question.length > 0) {
                    item.images_question = item.images_question.map((img) => {
                        if (img.image) {
                            img.image = Buffer.from(img.image, "base64").toString("binary");
                        }
                        return img;
                    });
                }
                return item;
            });
        }

        if (!data) {
            return {
                errCode: 3,
                message: "QuizSet not found !"
            }
        }
        return {
            errCode: 0,
            data: data
        }
    },

    handleUpsertQuiz: async (input) => {
        try {
            console.log("Check input: ", input)
            if (!input.action) {
                return {
                    errCode: 4,
                    message: "Missing action !"
                }
            }
            if (input.action === "ADD") {
                let quizSet = {}
                if (!input.id) {
                    let { isValid, message } = checkValidate(input,
                        ["title", "description", "duration_minute"]);
                    if (isValid) {
                        return {
                            errCode: 2,
                            message: message,
                        }
                    }
                    // Create quizsets
                    quizSet = await db.Quizzes.create({
                        title: input.title,
                        image: input.image,
                        description: input.description,
                        duration_minutes: input.duration_minute,
                        number_questions: input.number_questions
                    })
                } else {
                    quizSet = await db.Quizzes.findOne({
                        where: { id: input.id }
                    })

                    if (!quizSet) {
                        return {
                            errCode: 3,
                            message: "Bộ câu hỏi không tồn tại.",
                        };
                    }
                }

                for (const q of input.questions) {
                    // handle question
                    const createdQuestion = await db.Quizzes_Questions.create({
                        quiz_id: quizSet.id,
                        content: q.content,
                        type: q.type,
                        explanation: q.explanation,
                    });
                    // handle image_question
                    if (Array.isArray(q.images_question)) {
                        const imagesToCreate = q.images_question.map((img) => ({
                            question_id: createdQuestion.id,
                            image: img.image,
                            caption: img.caption || "",
                        }));
                        await db.Quizzes_Question_Images.destroy({
                            where: { question_id: createdQuestion.id }
                        });
                        await db.Quizzes_Question_Images.bulkCreate(imagesToCreate);
                    }
                    // handle answer
                    let answers = [];
                    if (Array.isArray(q.answers) && q.answers.length > 0) {
                        answers = q.answers.map((a) => ({
                            question_id: createdQuestion.id,
                            content: a.content,
                            is_correct: a.is_correct,
                        }));
                    } else if (Array.isArray(q.options) && typeof q.correctAnswer === "number") {
                        answers = q.options.map((opt, i) => ({
                            question_id: createdQuestion.id,
                            content: opt,
                            is_correct: i === q.correctAnswer,
                        }));
                    }
                    if (answers.length > 0) {
                        await db.Quizzes_Answers.bulkCreate(answers);
                    }

                }
                return {
                    errCode: 0,
                    message: "Create quiz successfully "
                }
            } else {

                // Validate input
                const { isValid, message } = checkValidate(input, [
                    "id", "title", "description", "duration_minutes", "number_questions"
                ]);

                if (isValid) {
                    return {
                        errCode: 2,
                        message
                    };
                }

                // Check Quiz
                const existingQuiz = await db.Quizzes.findOne({ where: { id: input.id } });

                if (!existingQuiz) {
                    return {
                        errCode: 3,
                        message: "Không tìm thấy bộ câu hỏi."
                    };
                }

                // Update Quiz
                await existingQuiz.update({
                    title: input.title,
                    image: input.image,
                    description: input.description,
                    duration_minutes: input.duration_minutes,
                    number_questions: input.number_questions
                });

                // Save list ID from FE
                const incomingquestion_ids = input.questions
                    .filter((q) => q.id)
                    .map((q) => q.id);

                // Delete question old
                await db.Quizzes_Questions.destroy({
                    where: {
                        quiz_id: input.id,
                        id: { [db.Sequelize.Op.notIn]: incomingquestion_ids }
                    }
                });

                // Upsert questions + answers
                for (const q of input.questions) {
                    let question = null;

                    if (q.id) {
                        question = await db.Quizzes_Questions.findOne({ where: { id: q.id } });
                        if (!question) {
                            return {
                                errCode: 4,
                                message: `Question not found with id: ${q.id}`
                            };
                        }

                        await question.update({
                            content: q.content,
                            explanation: q.explanation,
                            type: q.type
                        });
                    } else {
                        question = await db.Quizzes_Questions.create({
                            quiz_id: input.id,
                            content: q.content,
                            explanation: q.explanation,
                            type: q.type
                        });
                    }

                    if (Array.isArray(q.images_question)) {
                        const incomingImageIds = q.images_question
                            .filter((img) => img.id)
                            .map((img) => img.id);

                        if (incomingImageIds.length > 0) {
                            await db.Quizzes_Question_Images.destroy({
                                where: {
                                    question_id: question.id,
                                    id: { [db.Sequelize.Op.notIn]: incomingImageIds }
                                }
                            });
                        } else {
                            await db.Quizzes_Question_Images.destroy({
                                where: { question_id: question.id }
                            });
                        }

                        for (const img of q.images_question) {
                            if (img.id) {
                                const existingImage = await db.Quizzes_Question_Images.findOne({
                                    where: { id: img.id, question_id: question.id }
                                });

                                if (existingImage) {
                                    await existingImage.update({
                                        image: img.image,
                                        caption: img.caption || ""
                                    });
                                }
                            } else {
                                await db.Quizzes_Question_Images.create({
                                    question_id: question.id,
                                    image: img.image,
                                    caption: img.caption || ""
                                });
                            }
                        }
                    }

                    if (Array.isArray(q.answers)) {
                        const incomingAnswerIds = q.answers
                            .filter((a) => a.id)
                            .map((a) => a.id);

                        if (incomingAnswerIds.length > 0) {
                            await db.Quizzes_Answers.destroy({
                                where: {
                                    question_id: question.id,
                                    id: { [db.Sequelize.Op.notIn]: incomingAnswerIds }
                                }
                            });
                        } else {
                            await db.Quizzes_Answers.destroy({
                                where: { question_id: question.id }
                            });
                        }

                        for (const a of q.answers) {
                            if (a.id) {
                                const existingAnswer = await db.Quizzes_Answers.findOne({
                                    where: { id: a.id }
                                });

                                if (existingAnswer) {
                                    await existingAnswer.update({
                                        content: a.content,
                                        is_correct: a.is_correct
                                    });
                                }
                            } else {
                                await db.Quizzes_Answers.create({
                                    question_id: question.id,
                                    content: a.content,
                                    is_correct: a.is_correct
                                });
                            }
                        }
                    }
                }

                return {
                    errCode: 0,
                    message: "Updated Quiz successfully !"
                };



            }
        } catch (error) {
            console.error("❌ Lỗi trong handleUpsertQuiz:", error);
            return {
                errCode: -1,
                message: "Lỗi hệ thống: " + error.message
            };
        }

    },

    handleGetQuestionByQuiz: async ({ id, limit = 10, page = 1, role = "R1" }) => {
        if (!id) {
            return {
                errCode: 2,
                message: "Missing quiz id !"
            };
        }
        // fetch number question for exam
        const quiz = await db.Quizzes.findOne({
            where: { id: id },
            attributes: ["title", "number_questions", "description", "duration_minutes"]
        });

        if (!quiz) {
            return {
                errCode: 3,
                message: "Quiz not found !"
            };
        }

        const validPage = isNaN(+page) || +page < 1 ? 1 : +page;
        let validLimit;
        if (role === "R2") {
            validLimit = !limit || isNaN(+limit) || +limit < 1
                ? +quiz.number_questions
                : +limit;
        } else {
            validLimit = isNaN(+limit) || +limit < 1 ? 3 : +limit;
        }
        const offset = (validPage - 1) * validLimit;
        const questions = await db.Quizzes_Questions.findAndCountAll({
            where: { quiz_id: id },
            include: [
                {
                    model: db.Quizzes_Answers,
                    as: "answers"
                },
                {
                    model: db.Quizzes_Question_Images,
                    as: "images_question",
                    attributes: ["image", "caption"]
                }
            ],
            limit: validLimit,
            offset: offset,
            raw: false,
            nest: true,
            distinct: true,
        });

        if (questions.rows && questions.rows.length > 0) {
            questions.rows = questions.rows.map((item, index) => {
                if (item.images_question && item.images_question.length > 0) {
                    item.images_question.map((img) => {
                        if (img.image) {
                            img.image = Buffer.from(img.image, "base64").toString("binary");
                        }
                        return img;
                    })
                }
                return item;
            })
        }

        if (!questions) {
            return {
                errCode: 3,
                message: "Question not found !"
            };
        }

        let result = questions.rows.map((q) => {
            const qJson = q.toJSON();

            let processedAnswers = qJson.answers.map((ans) => {
                if (role === "R2") {
                    const { is_correct, ...rest } = ans;
                    return rest;
                }
                return ans;
            });

            if (role === "R2") {
                processedAnswers = _.shuffle(processedAnswers);
                delete qJson.explanation;
            }

            return {
                ...qJson,
                answers: processedAnswers,
            };
        });

        if (role === "R2") {
            result = _.shuffle(result);
        }

        return {
            errCode: 0,
            data: result,
            total: questions.count,
            page: +validPage,
            limit: +validLimit,
            quiz: quiz
        };
    },

    handleDeleteQuiz: async (id) => {
        if (!id) {
            return {
                errCode: 2,
                message: "Missing input ID !"
            }
        } else {
            await db.Quizzes.destroy({
                where: { id: id }
            });
            return {
                errCode: 0,
                message: "Delete Quiz successfully !"
            }
        }
    },

    handleSumbissions: async (input) => {
        let { isValid, message } = checkValidate(input,
            ["quiz_id", "user_id", "duration_used", "total_question"]);

        if (isValid) {
            return {
                errCode: 2,
                message: message,
            };
        }

        // initial result
        const result = await db.Quizzes_Results.create({
            user_id: input.user_id,
            quiz_id: input.quiz_id,
            submitted_at: new Date(),
            duration_used: Math.ceil((input.duration_used) / 60),
            total_question: input.total_question,
        });

        // list question
        const question_ids = input.answers.map(a => a.question_id);

        // check correct answer -> question
        const correctAnswers = await db.Quizzes_Answers.findAll({
            where: {
                question_id: question_ids,
                is_correct: true
            },
            attributes: ['question_id', 'id']
        });

        // group question → 1 or more correct answer
        const correctMap = {};
        for (let ans of correctAnswers) {
            if (!correctMap[ans.question_id]) correctMap[ans.question_id] = [];
            correctMap[ans.question_id].push(ans.id);
        }

        let totalCorrect = 0;

        const selectedAnswerRecords = input.answers.map((item) => {
            const correctIds = correctMap[item.question_id] || [];
            let is_correct = false;

            if (input.type === 'QT1' || input.type === 'QT3') {
                // 1 one correct answer True/False:
                is_correct = correctIds.includes(item.answer_id);
            } else if (input.type === 'QT2') {
                // more correct answers
                const submitted = Array.isArray(item.answer_id)
                    ? item.answer_id.sort()
                    : [item.answer_id];

                const correctSorted = correctIds.sort();
                is_correct = JSON.stringify(submitted) === JSON.stringify(correctSorted);
            }

            if (is_correct) totalCorrect++;

            return {
                quiz_result_id: result.id,
                question_id: item.question_id,
                answer_id: item.answer_id,
                is_correct,
            };
        });

        // save answer selected
        await db.Quizzes_Selected_Answers.bulkCreate(selectedAnswerRecords);

        // point
        const scorePerQuestion = (10 / input.total_question).toFixed(2);
        const total_score = Number((totalCorrect * scorePerQuestion).toFixed(2));

        // update r
        await db.Quizzes_Results.update({
            total_correct: totalCorrect,
            total_score,
            passed: total_score >= 8
        }, {
            where: { id: result.id }
        });

        return {
            errCode: 0,
            message: "Submit exam successfully!"
        };
    },

    handleGetQuizResult: async () => {
        let statistics = "";
        let data = await db.Quizzes_Results.findAll({
            include: [
                {
                    model: db.Users,
                    as: "userData",
                    attributes: ["name"]
                },
                {
                    model: db.Quizzes,
                    as: "quizzes",
                    attributes: ["title"]
                }
            ]
        });

        // filter unique id
        const listStudent = data.reduce((acc, curr) => {
            if (!acc.some(item => item.user_id === curr.user_id)) {
                acc.push(curr);
            }
            return acc;
        }, []);

        // total number_questions
        const total_score = data.reduce((acc, curr) => {
            return acc + Number(curr.total_score || 0);
        }, 0);

        // turn passed
        const finish = data.filter(item => item.passed === true).length;

        statistics = {
            listStudent: listStudent.length,
            total_result: data.length,
            average_score: data.length > 0 ? (total_score / data.length).toFixed(2) : 0,
            average_finish: data.length > 0 ? ((finish / data.length) * 100).toFixed(2) : 0,
        };

        return {
            errCode: 0,
            data,
            statistics
        };
    },

    handleGetQuiz: async () => {
        try {
            const data = await db.Quizzes.findAll({
                attributes: ['title', 'id']
            })

            if (!data) {
                return {
                    errCode: -1,
                    message: "Data not found !"
                }
            }
            return {
                errCode: 0,
                data
            }

        } catch (error) {
            throw error
        }
    }


};

module.exports = quizService;
