const { verifyToken, getTokenFromHeader } = require("../utils/auth.utils");

exports.requireAuth = (req, res, next) => {
    const token = getTokenFromHeader(req);
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        req.user = verifyToken(token);
        next();
    } catch (_) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
