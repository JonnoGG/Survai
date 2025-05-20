const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { verifySurveyOwner } = require("../middleware/verifySurveyOwner.middleware");
const surveyController = require("../controllers/surveys.controller");
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__basedir, "/public/pages/surveys.html"));
});

router.get("/builder", (req, res) => {
    res.sendFile(path.join(__basedir, "/public/pages/builder.html"));
});

// All api endpoints require auth
router.use(requireAuth);

router.post("/", surveyController.createSurvey);
router.get("/all", surveyController.getAllSurveys);
router.get("/:id", verifySurveyOwner, surveyController.getSurveyById);
router.put("/:id", verifySurveyOwner, surveyController.updateSurvey);
router.delete("/:id", verifySurveyOwner, surveyController.deleteSurvey);
router.put("/:id/questions", verifySurveyOwner, surveyController.updateSurveyQuestions);

module.exports = router;
