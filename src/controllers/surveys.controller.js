const surveyModel = require("../models/survey.model");

exports.createSurvey = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
        const survey = await surveyModel.insertSurvey(userId, title, description);
        res.status(201).json({
            status: "success",
            data: { survey },
        });
    } catch (err) {
        console.error("Error creating survey:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.getAllSurveys = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveys = await surveyModel.getAllSurveys(userId);
        res.status(200).json({
            status: "success",
            data: { surveys },
        });
    } catch (err) {
        console.error("Error getting surveys:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.getSurveyById = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveyId = req.params.id;
        const survey = await surveyModel.getSurveyDetails(surveyId, userId);
        if (!survey) {
            return res.status(404).json({
                status: "fail",
                message: "Survey not found",
            });
        }
        res.status(200).json({
            status: "success",
            data: { survey },
        });
    } catch (err) {
        console.error("Error getting survey by id:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.updateSurvey = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveyId = req.params.id;
        const updated = await surveyModel.updateSurvey(surveyId, userId, req.body);
        if (!updated) {
            return res.status(404).json({
                status: "fail",
                message: "Survey not found.",
            });
        }
        res.status(200).json({
            status: "success",
            data: { updated },
        });
    } catch (err) {
        console.error("Error updating survey:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.deleteSurvey = async (req, res) => {
    try {
        const userId = req.user.id;
        const surveyId = req.params.id;
        const deleted = await surveyModel.deleteSurvey(surveyId, userId);
        if (!deleted) {
            return res.status(404).json({
                status: "fail",
                message: "Survey not found.",
            });
        }
        res.status(204).send();
    } catch (err) {
        console.error("Error deleting survey:", err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
