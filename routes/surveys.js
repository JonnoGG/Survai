const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/surveys')

router.get('/', feedbackController.getAllFeedback);

module.exports = router;