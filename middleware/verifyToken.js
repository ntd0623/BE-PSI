const jwt = require("jsonwebtoken");

// verify user
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Không có token!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
};

// verify role Admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user?.roleID === "R1") {
            next();
        } else {
            return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
        }
    });
};

// verify role Student
const verifyTokenAndStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user?.roleID === "R2") {
            next();
        } else {
            return res.status(403).json({ message: "Chỉ dành cho sinh viên!" });
        }
    });
};

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndStudent,
};
