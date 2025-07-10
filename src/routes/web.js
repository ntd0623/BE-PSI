const express = require("express");
const cvController = require("../controller/cvControlller");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const quizController = require("../controller/quizController");
const verifyToken = require("../middleware/verifyToken");
const checkPassCVIfStudent = require("../middleware/checkPassedCV");
const router = express.Router();

const initWebRoutes = (app) => {
    // AllCode
    router.get("/api/get-allCode", userController.getAllCodes)
    // CV
    router.get("/api/get-cv", cvController.getCV);
    router.post("/api/upsert-cv", cvController.upsertCV);
    router.get("/api/get-cv-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, cvController.getDetailCvByIdUser);
    router.put("/api/update-cv-by-userId", cvController.updateStatusCV);
    router.get("/api/get-cv-by-studentID-and-idCv", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, cvController.getCVByStudentIDAndCvID)
    router.delete("/api/delete-cv", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, cvController.deleteCv)

    // Student
    router.get("/api/get-list-student", userController.getAllStudentByCV)
    router.get("/", (req, res) => {
        return res.send("Hello Backend PSI");
    });

    // Login
    router.post("/api/login", userController.login)


    // Login with google 
    router.post("/api/auth/google-auth", authController.googleAuth)

    // Login with Facebook
    router.post("/api/auth/facebook", authController.facebookAuth);
    // Register
    router.post("/api/register", userController.register);

    // Quiz
    router.get("/api/get-quiz-set", verifyToken.verifyToken, checkPassCVIfStudent, quizController.getQuizSets)
    router.get("/api/get-quiz-set-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.getQuizSetByID)
    router.post("/api/upsert-quiz-set", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.upsertQuizSet)
    router.delete("/api/delete-quiz-set", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.deleteQuizSet)
    // Question
    router.get("/api/get-question-by-quizID", verifyToken.verifyToken, checkPassCVIfStudent, quizController.getQuestionByQuizID);
    router.post("/api/quiz-submissions", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, quizController.quizSubmissions);
    // Quiz-Result
    router.get("/api/get-quiz-result", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.getQuizResult)

    return app.use("/", router);
};
module.exports = initWebRoutes;
