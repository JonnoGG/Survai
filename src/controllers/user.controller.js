const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { isValidEmail, validatePassword } = require("../utils/validators");

exports.createUser = async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    const errors = {};

    try {
        if (await userModel.isUserTaken(email)) {
            errors.user = "An account with that email already exists. Please log in or reset your password.";
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
                    errors: errors,
                }
            });
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);

        await userModel.createUser(email, passwordHash);

        res.status(201).json({
            status: "success",
            message: "User created successfully.",
            data: `Email: ${email}`,
        });
    } catch (err) {
        console.error("Error creating user: " + err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};
