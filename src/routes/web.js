const express = require("express");
const cvController = require("../controller/cvControlller");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const quizController = require("../controller/quizController");
const scheduleController = require("../controller/scheduleController");
const verifyToken = require("../middleware/verifyToken");
const errorHandler = require("../utils/errorHandler");
const attemptController = require("../controller/attemptController");
const classController = require("../controller/classController");
const router = express.Router();

const initWebRoutes = (app) => {
    // AllCode
    router.get("/api/get-allCode", userController.getAllCodes)
    // CV
    router.get("/api/get-cv", cvController.getCV);
    router.post("/api/upsert-cv", cvController.upsertCV);
    router.get("/api/get-cv-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, cvController.getDetailCvByIdUser);
    router.put("/api/update-cv-by-user-id", cvController.updatestatus_cv);
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
    // User
    router.get("/api/get-user", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.getUsers);
    router.get("/api/get-class-for-student", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.getClassForStudent);
    router.post("/api/create-student", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.createStudent);
    router.post("/api/import-students", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.importStudents);
    router.put("/api/update-students", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.updateStudent);
    router.get("/api/get-student-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.getStudentById)
    router.delete("/api/delete-student", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, userController.deleteStudent)
    // Class
    router.post("/api/create-class", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, classController.createClass);
    router.put("/api/update-class", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, classController.updateClass);
    router.delete("/api/delete-class", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, classController.deleteClass);
    router.get("/api/get-classes", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, classController.getClasses);
    router.get("/api/get-class-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, classController.getClassById);
    // Quiz
    router.get("/api/get-quiz-set", verifyToken.verifyToken, quizController.getQuizSets)
    router.get("/api/get-quiz-set-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.getQuizSetByID)
    router.post("/api/upsert-quiz-set", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.upsertQuizSet)
    router.delete("/api/delete-quiz-set", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.deleteQuizSet)
    // Exam
    router.get("/api/get-quiz", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.getQuiz)
    router.post("/api/create-attempt", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, attemptController.createAttempt)
    router.post('/api/quiz/answer/save', verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, attemptController.saveSelectedAnswer);
    router.get('/api/get-attempt', verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, attemptController.getAttempt);
    router.post("/api/auto-save-attempt", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, attemptController.autoSave);
    router.post("/api/submit-attempt", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, attemptController.submitQuiz);
    router.get("/api/get-result-attempt", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, attemptController.getResultAttempt);
    router.get("/api/get-all-quiz", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, attemptController.getAllQuiz);
    router.get("/api/export-result", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, attemptController.exportResult);
    // Schedule
    router.post("/api/create-schedule", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, scheduleController.createSchedule)
    router.put("/api/update-schedule", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, scheduleController.updateSchedule)
    router.get("/api/get-schedule", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, scheduleController.getSchedule)
    router.delete("/api/delete-schedule", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, scheduleController.deleteSchedule)
    router.get("/api/get-schedule-by-id", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, scheduleController.getScheduleById)
    router.get("/api/get-schedule-by-exam-code", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, scheduleController.getScheduleByExamCode)
    // Question
    router.get("/api/get-question-by-quiz-id", verifyToken.verifyToken, quizController.getQuestionByquiz_id);
    router.post("/api/quiz-submissions", verifyToken.verifyToken, verifyToken.verifyTokenAndStudent, quizController.quizSubmissions);
    // Quiz-Result
    router.get("/api/get-quiz-result", verifyToken.verifyToken, verifyToken.verifyTokenAndAdmin, quizController.getQuizResult)

    app.use("/", router);

    app.use(errorHandler);

    return app;
};
module.exports = initWebRoutes;
