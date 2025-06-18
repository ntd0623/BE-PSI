const authService = require("../services/authService");

const authController = {
    googleAuth: async (req, res) => {
        try {
            const { token } = req.body;
            const result = await authService.handleGoogleLogin(token);
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
};

module.exports = authController;