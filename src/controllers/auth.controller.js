const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { isValidEmail, validatePassword } = require("../utils/validation.utils");
const { getTokenFromHeader, verifyToken } = require("../utils/auth.utils");

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const userModel = require("../models/user.model");
    const { isValidEmail } = require("../utils/validation.utils");

    //error 400 checking - bad request
    const errors = [];

    if (!isValidEmail(email)) {
        errors.push({
            field: "email",
            message: "Email is invalid.",
        });
    }
    if (!password || typeof password !== "string") {
        errors.password = "Password is required.";
        errors.push({
            field: "password",
            message: "Password is required.",
        });
    }

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid inputs.",
            data: {
                errors: errors,
            },
        });
    }

    try {
        const user = await userModel.findByEmail(email);

        //user does not exist
        if (!user || !(await userModel.checkPassword(password, user.password_hash))) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password.",
            });
        }

        // successful login
        //create JWT with 15 min expiry
        //TODO add refresh token functionality
        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_KEY, { expiresIn: 60 * 15 });
        return res.status(200).json({
            status: "success",
            message: "Login successful.",
            token
        });
    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;
    const errors = [];

    try {
        if (await userModel.isUserTaken(email)) {
            errors.push({
                field: "user",
                message: "An account with that email already exists. Please log in or reset your password.",
            });
        } else {
            if (!isValidEmail(email)) {
                errors.push({
                    field: "email",
                    message: "Email is invalid.",
                });
            }

            const passwordErrors = validatePassword(password);
            passwordErrors.forEach((err) => {
                errors.push({ field: "password", message: err });
            });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid inputs.",
                data: { errors },
            });
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);

        await userModel.createUser(email, passwordHash);

        const user = await userModel.findByEmail(email);

        //successful signup
        //create JWT with 15 min expiry
        //TODO add refresh token functionality

        const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, { expiresIn: 60 * 15 });
        res.status(201).json({
            status: "success",
            message: "User created successfully.",
            token,
        });
    } catch (err) {
        console.error("Error creating user: " + err);
        res.status(500).json({
            status: "error",
            message: "Internal server error.",
        });
    }
};

exports.verify = (req, res) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = verifyToken(token);
        res.status(200).json({ user });
    } catch (_err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}