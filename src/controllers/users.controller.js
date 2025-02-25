const bcrypt = require("bcrypt");
const userModel = require("../models/users.model");
const { isValidEmail, validatePassword } = require("../utils/validators");

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;
    const errors = {};

    try {
        if (await userModel.isUserTaken(username, email)) {
            errors.user = "Username or email is already taken.";
        }

        if (!isValidEmail(email)) {
            errors.email = "Email is invalid.";
        }

        const passwordErrors = validatePassword(password);
        if (passwordErrors.length > 0) {
            errors.password = passwordErrors;
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid inputs.",
                data: {
                    errors: errors
                },
            });
        }

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
