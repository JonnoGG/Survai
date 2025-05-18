const db = require('../config/db.config');

exports.hasResponses = async (surveyId) => {
    const res = await db.query(
        "SELECT COUNT(*) FROM responses WHERE survey_id = $1",
        [surveyId]);
    const count = parseInt(res.rows[0].count);
    return count > 0;
}