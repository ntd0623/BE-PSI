const quizService = require("../services/quizService");

const quizController = {
    getQuizSets: async (req, res) => {
        try {
            const role_id = req.user.role_id;
            const sort = req.query.sort || null;
            const result = await quizService.handleGetQuizSets(role_id, sort);
            return res.status(200).json(result);
        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },

    getQuizSetByID: async (req, res) => {
        try {
            const result = await quizService.handleGetQuizByID(req.query.id);
            return res.status(200).json(result)
        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },

    getQuestionByquiz_id: async (req, res) => {
        try {
            const { id, limit = 10, page = 1, role = "R1" } = req.query;
            const result = await quizService.handleGetQuestionByQuiz({ id, limit, page, role });
            return res.status(200).json(result)

        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },

    upsertQuizSet: async (req, res) => {
        try {
            const result = await quizService.handleUpsertQuiz(req.body);
            return res.status(200).json(result)

        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },

    deleteQuizSet: async (req, res) => {
        try {
            const result = await quizService.handleDeleteQuiz(req.query.id);
            return res.status(200).json(result)

        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },
    quizSubmissions: async (req, res) => {
        try {
            const result = await quizService.handleSumbissions(req.body);
            return res.status(200).json(result)

        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },
    getQuizResult: async (req, res) => {
        try {
            const result = await quizService.handleGetQuizResult();
            return res.status(200).json(result)

        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    },
    getQuiz: async (req, res) => {
        try {
            const result = await quizService.handleGetQuiz();
            return res.status(200).json(result)
        } catch (error) {
            console.error("Lỗi controller:", error);
            return res.status(500).json(
                {
                    errCode: 1,
                    message: "Error form server !"
                }
            );
        }
    }
};

module.exports = quizController;