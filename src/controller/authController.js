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
    facebookAuth: async (req, res) => {
        const { access_token } = req.body;

        try {
            const result = await authService.facebookAuthService(access_token);

            return res.status(200).json(result);
        } catch (err) {
            console.error("Facebook login error:", err);
            return res.status(401).json({ message: "Xác thực Facebook thất bại." });
        }
    }

};

module.exports = authController;