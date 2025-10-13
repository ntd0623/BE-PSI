const db = require("../models");
const checkPassCVIfStudent = async (req, res, next) => {
    try {
        const user = req.user;


        if (user.role_id === "R2") {
            const cv = await db.Cvs.findOne({
                where: {
                    user_id: user.id,
                    status_cv: "CV3",
                },
            });

            if (!cv) {
                return res.status(200).json({
                    errCode: 3,
                    message: "CV not passed",
                });
            }
        }

        next(); // allow if admin
    } catch (error) {
        console.error("checkPassCVIfStudent error:", error);
        return res.status(500).json({
            errCode: -1,
            message: "Lỗi hệ thống",
        });
    }
};

module.exports = checkPassCVIfStudent;
