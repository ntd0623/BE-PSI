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
    handleGetQuizSets: async (role) => {

        let data = await db.Quizzes.findAll({
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
                averageTime: result.length > 0 ? totalTime / result.length : 0,
                unFinished: result.length > 0 ? (attemptFailed.length / result.length) * 100 : 0,
            };
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
                            as: "answers"
                        }
                    ]
                }
            ]
        })
        if (data && data.image) {
            data.image = Buffer.from(data.image, "base64").toString("binary");
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
                    score: input.score
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
                const createdQuestion = await db.Quizzes_Questions.create({
                    quizID: quizSet.id,
                    content: q.content,
                    explanation: q.explanation,
                });

                const answers = q.options.map((opt, i) => ({
                    questionID: createdQuestion.id,
                    content: opt,
                    isCorrect: i === q.correctAnswer,
                }));

                await db.Quizzes_Answers.bulkCreate(answers);
            }
            return {
                errCode: 0,
                message: "Create quiz successfully "
            }
        } else {

            // Validate input
            const { isValid, message } = checkValidate(input, [
                "id", "title", "description", "duration_minutes", "score"
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
                score: input.score
            });

            // Save list ID from FE
            const incomingQuestionIds = input.questions
                .filter((q) => q.id)
                .map((q) => q.id);

            // Delete question old
            await db.Quizzes_Questions.destroy({
                where: {
                    quizID: input.id,
                    id: { [db.Sequelize.Op.notIn]: incomingQuestionIds }
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
                        explanation: q.explanation
                    });
                } else {
                    question = await db.Quizzes_Questions.create({
                        quizID: input.id,
                        content: q.content,
                        explanation: q.explanation
                    });
                }

                // Handle answers
                const incomingAnswerIds = q.answers
                    .filter((a) => a.id)
                    .map((a) => a.id);

                // Delete Answer old
                await db.Quizzes_Answers.destroy({
                    where: {
                        questionID: question.id,
                        id: { [db.Sequelize.Op.notIn]: incomingAnswerIds }
                    }
                });

                for (const a of q.answers) {
                    if (a.id) {
                        const existingAnswer = await db.Quizzes_Answers.findOne({
                            where: { id: a.id }
                        });

                        if (existingAnswer) {
                            await existingAnswer.update({
                                content: a.content,
                                isCorrect: a.isCorrect
                            });
                        }
                    } else {
                        await db.Quizzes_Answers.create({
                            questionID: question.id,
                            content: a.content,
                            isCorrect: a.isCorrect
                        });
                    }
                }
            }

            return {
                errCode: 0,
                message: "Updated Quiz successfully !"
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

        const validPage = isNaN(+page) || +page < 1 ? 1 : +page;
        const validLimit = isNaN(+limit) || +limit < 1 ? 3 : +limit;
        const offset = (validPage - 1) * validLimit;

        const questions = await db.Quizzes_Questions.findAndCountAll({
            where: { quizID: id },
            include: [
                {
                    model: db.Quizzes_Answers,
                    as: "answers"
                }
            ],
            limit: validLimit,
            offset: offset,
            raw: false,
            nest: true,
            distinct: true,
        });

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
                    const { isCorrect, ...rest } = ans;
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
            limit: +validLimit
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
            }
        }

        const result = await db.Quizzes_Results.create({
            userID: input.user_id,
            quiz_id: input.quiz_id,
            submitted_at: new Date(),
            duration_used: Math.ceil((input.duration_used) / 60),
            total_question: input.total_question,
        })

        // handle correct answer

        const questionIDs = input.answers.map(a => a.question_id);

        const correctAnswers = await db.Quizzes_Answers.findAll({
            where: {
                questionID: questionIDs,
                isCorrect: true
            },
            attributes: ['questionID', 'id']
        });

        const correctMap = correctAnswers.reduce((map, ans) => {
            map[ans.questionID] = ans.id;
            return map;
        }, {});
        // create list answer
        let totalCorrect = 0;

        const selectedAnswerRecords = input.answers.map((item) => {
            const isCorrect = item.answer_id === correctMap[item.question_id];
            if (isCorrect) totalCorrect++;

            return {
                quiz_result_id: result.id,
                question_id: item.question_id,
                answer_id: item.answer_id,
                isCorrect,
            };
        });
        await db.Quizzes_Selected_Answers.bulkCreate(selectedAnswerRecords);
        const total_score = Number((totalCorrect * 0.25).toFixed(2));
        await db.Quizzes_Results.update({
            total_correct: +totalCorrect,
            total_score: total_score,
            passed: total_score >= 8
        }, {
            where: { id: result.id },
            logging: console.log,
        });
        return {
            errCode: 0,
            message: "Submit exam successfully !"
        }

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
            if (!acc.some(item => item.userID === curr.userID)) {
                acc.push(curr);
            }
            return acc;
        }, []);

        // total score
        const total_score = data.reduce((acc, curr) => {
            return acc + Number(curr.total_score || 0);
        }, 0);

        // turn passed
        const finish = data.filter(item => item.passed === true).length;

        statistics = {
            listStudent: listStudent.length,
            total_result: data.length,
            average_score: data.length > 0 ? total_score / data.length : 0,
            average_finish: data.length > 0 ? (finish / data.length) * 100 : 0,
        };

        return {
            errCode: 0,
            data,
            statistics
        };
    }


};

module.exports = quizService;
