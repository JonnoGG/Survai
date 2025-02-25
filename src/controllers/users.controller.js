const bcrypt = require("bcrypt");
const userModel = require("../models/users.model");
const { isValidEmail } = require("../utils/validators");

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    try {
        if (!isValidEmail(email)) {
            return res.status(400).json({
                status: "fail",
                message: "Email is invalid.",
            });
        }
        if (await userModel.isUserTaken(username, email)) {
            return res.status(400).json({
                status: "fail",
                message: "Username or email is already taken.",
            });
        }

        //TODO: check that password meets requirements

        const passwordHash = await bcrypt.hash(password, saltRounds);

        userModel.createUser(username, email, passwordHash);

        res.status(201).json({
            status: "success",
            message: "User created successfully.",
            data: `Username: ${username}, Email: ${email}`,
        });
    } catch (err) {
        console.error("Error creating user: " + err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
