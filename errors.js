class AppError extends Error {
    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.status = String(statusCode).startsWith("4") ? "fail" : "error";
        this.isOperational = isOperational;

        // Capture stack trace excluding constructor call
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

module.exports = AppError;
