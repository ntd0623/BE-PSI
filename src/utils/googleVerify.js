const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.BACK_END_GG_CLIENT_ID);

const googleVerify = {

    verifyGoogleToken: async (token) => {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.BACK_END_GG_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        // Return mail, name, avt
        return payload;
    }
}

module.exports = googleVerify;