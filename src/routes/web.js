const express = require("express");
const cvController = require("../controller/cvControlller");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const router = express.Router();

const initWebRoutes = (app) => {
    // AllCode
    router.get("/api/get-allCode", userController.getAllCodes)
    // CV
    router.get("/api/get-cv", cvController.getCV);
    router.post("/api/create-cv", cvController.createCV);
    router.get("/api/get-cv-by-id", cvController.getDetailCvByIdUser);
    router.put("/api/update-cv-by-userId", cvController.updateStatusCV);


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
    router.post("/api/register", userController.register)
    return app.use("/", router);
};

module.exports = initWebRoutes;
