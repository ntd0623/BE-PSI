import express from "express";
import { cvController } from "../controller/cvControlller.js";  // nhớ thêm .js nếu dùng ES module

const router = express.Router();

const initWebRoutes = (app) => {
    // get list cv
    router.get("/api/get-cv", cvController.getCV);
    // create cv
    router.post("/api/create-cv", cvController.createCV);
    // get cv by id user
    router.get("/api/get-cv-by-id", cvController.getDetailCvByIdUser);
    // Delete CV
    router.put("/api/update-cv-by-userId", cvController.updateStatusCV)
    return app.use("/", router);
};

export default initWebRoutes;