const AppError = require("../../errors");

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code, // thêm code để FE phân biệt
        });
    }

    console.error("Unexpected error: ", err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        code: "INTERNAL_ERROR",
    });
};

module.exports = errorHandler;
