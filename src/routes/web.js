const express = require("express");
const cvController = require("../controller/cvControlller");

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/api/get-cv", cvController.getCV);
    router.post("/api/create-cv", cvController.createCV);
    router.get("/api/get-cv-by-id", cvController.getDetailCvByIdUser);
    router.put("/api/update-cv-by-userId", cvController.updateStatusCV);

    router.get("/", (req, res) => {
        return res.send("Hello Backend PSI");
    });

    return app.use("/", router);
};

module.exports = initWebRoutes;
