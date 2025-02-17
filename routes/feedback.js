const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback')

router.get('/', feedbackController.getAllFeedback);

module.exports = router;