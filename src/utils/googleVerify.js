const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.BACK_END_GG_CLIENT_ID);

const googleVerify = {

    verifyGoogleToken: async (token) => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.BACK_END_GG_CLIENT_ID,
            });
            return ticket.getPayload();
        } catch (error) {
            console.error("Google token verification failed:", error);
            return null;
        }
    }

}

module.exports = googleVerify;