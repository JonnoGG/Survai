const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
const surveyController = require("../controllers/survey.controller");

router.get("/", requireAuth, surveyController.testFunction);

module.exports = router;
