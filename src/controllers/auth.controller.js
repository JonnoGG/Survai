exports.login = async (req, res) => {
    const { email, password } = req.body;
    const userModel = require("../models/user.model");
    const { isValidEmail } = require("../utils/validators");
    
    //error 400 checking - bad request
    const errors = {};
    if (!isValidEmail(email)) {
        errors.email = "Email is invalid.";
    }
    if (!password || typeof password !== "string") {
        errors.password = "Password is required.";
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

    try {
        // Replace this with real user lookup and password check
        const user = await userModel.findByEmail(email);

        //user does not exist
        if (!user || !(await userModel.checkPassword(password, user.password_hash))) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password.",
            });
        }

        // successful login
        //TODO: JWT storage?
        return res.status(200).json({
            status: "success",
            message: "Login successful.",
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
    return res.status(500).json({
        status: "error",
        message: "Internal server error.",
    });
};
