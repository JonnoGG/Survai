const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const { verifySurveyOwner } = require("../middleware/verifySurveyOwner.middleware");
const surveyController = require("../controllers/surveys.controller");

// All api endpoints require auth
router.use(requireAuth);

router.post("/", surveyController.createSurvey);
router.get("/all", surveyController.getAllSurveys);
router.get("/:id", verifySurveyOwner, surveyController.getSurveyById);
router.put("/:id", verifySurveyOwner, surveyController.updateSurvey);
router.delete("/:id", verifySurveyOwner, surveyController.deleteSurvey);
router.put("/:id/questions", verifySurveyOwner, surveyController.updateSurveyQuestions);

module.exports = router;
