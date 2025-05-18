const db = require('../config/db.config');

exports.verifySurveyOwner = async (req, res, next) => {
    const userId = req.user.id;
    const surveyId = req.params.id;
    try {
        const result = await db.query(
            "SELECT id FROM surveys WHERE id = $1 AND user_id = $2",
            [surveyId, userId]
        );
        if (result.rows.length === 0) {
            return res.status(403).json({
                status: "fail",
                message: "You do not own this survey."
            });
        }
        next();
    } catch (err) {
        console.error("Error performing survey ownership verification: ", err);
        res.status(500).json({
            status: "error",
            message: "Internal surver error."
        });
    }
}