const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

//router.get("/", userController.getFirstUser);
router.post("/", userController.createUser);

module.exports = router;
