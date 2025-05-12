const jwt = require("jsonwebtoken");

exports.getTokenFromHeader = (req) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) return null;
    return header.split(" ")[1];
};

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_KEY);
};
