const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const surveyController = require("../controllers/surveys.controller");

router.use(requireAuth);

router.post("/", surveyController.createSurvey);
router.get("/", surveyController.getAllSurveys);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);

module.exports = router;
