const googleVerify = require("../utils/googleVerify");
const db = require("../models");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const authService = {
    handleGoogleLogin: async (token) => {
        const payload = await googleVerify.verifyGoogleToken(token);

        if (!payload || !payload.email) {
            throw new Error("Token Google không hợp lệ");
        }

        let user = await db.Users.findOne({
            where: { email: payload.email },
        });

        if (!user) {
            user = await db.Users.create({
                email: payload.email,
                name: payload.name,
                avatar: payload.picture,
                provider: "Google",
                role_id: "R2"
            });
        }

        // Create JWT token
        const jwtToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_id: user.role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        return {
            errCode: 0,
            message: "Login with Google scuccessfully",
            data: user,
            token: jwtToken
        };
    },

    facebookAuthService: async (accessToken) => {
        const fbUser = await axios.get(
            `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${accessToken}`
        );

        const { name, email, picture } = fbUser.data;

        // Kiểm tra user trong DB
        let user = await db.Users.findOne({ where: { email } });

        if (!user) {
            // Nếu chưa có user, tạo mới
            user = await db.Users.create({
                email,
                name,
                provider: "Facebook",
                role_id: "R2",
                avatar: picture?.data?.url || null,
            });
        }

        // Create JWT token
        const jwtToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role_id: user.role_id,
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES }
        );

        return {
            errCode: 0,
            message: "Login with Facebook scuccessfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                avatar: user.avatar,
            },

            token: jwtToken,
        };
    },
};

module.exports = authService;
