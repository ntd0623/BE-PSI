import { cvService } from "../services/cvService.js";

// get list cv
let getCV = async (req, res) => {
    try {
        let cvs = await cvService.handleGetCV();
        return res.status(200).json(cvs);
    } catch (e) {
        console.error("Error from server!", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server!",
        });
    }
};

// create cv
let createCV = async (req, res) => {
    try {
        let data = await cvService.handleCreateCV(req.body);
        return res.status(200).json(data)
    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

// get detail Cv By Id User
let getDetailCvByIdUser = async (req, res) => {
    try {
        let cv = await cvService.handleGetDetailCV(req.query.id);
        return res.status(200).json(cv)

    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

let updateStatusCV = async (req, res) => {
    try {
        let data = await cvService.handleUpdateCV(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log("Error: ", e);
        return res.status(200).json({
            errCode: 1,
            message: "Error from server !"
        })
    }
}

export const cvController = { getCV, createCV, getDetailCvByIdUser, updateStatusCV };