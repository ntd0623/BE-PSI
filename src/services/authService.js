const googleVerify = require("../utils/googleVerify");
const db = require("../models");

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
                provider: "google",
                roleID: "R2"
            });
        }

        return {
            errCode: 0,
            data: user
        };
    },
};

module.exports = authService;
