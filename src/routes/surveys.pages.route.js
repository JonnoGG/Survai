const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__basedir, "/public/pages/surveys.html"));
});

router.get("/builder", (req, res) => {
    res.sendFile(path.join(__basedir, "/public/pages/builder.html"));
});

router.get("/:id", (req, res) => {
    res.sendFile(path.join(__basedir, "/public/pages/survey.html"));
});

module.exports = router;