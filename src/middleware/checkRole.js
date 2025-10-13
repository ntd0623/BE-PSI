const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({ errCode: 3, message: "Forbidden" });
        }
        next();
    };
};

module.exports = checkRole;
