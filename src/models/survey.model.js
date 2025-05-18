const db = require("../config/db.config");

exports.insertSurvey = async (userId, title, description) => {
    const result = await db.query(
        'INSERT INTO surveys (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [userId, title, description]
    );
    return result.rows[0]
}

exports.getAllSurveys = async (userId) => {
    const result = await db.query(
        'SELECT * FROM surveys WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
};

//TODO: test thoroughly
exports.getSurveyDetails = async (surveyId, userId) => {
    const survey = await db.query(`SELECT * FROM surveys WHERE id = $1 AND user_id = $2`, [surveyId, userId]);

    if (survey.rows.length === 0) return null;

    const questionsRes = await db.query(
        `SELECT 
            q.id, 
            q.question_text AS text, 
            q.question_type, 
            q.required,
            COALESCE(json_agg(json_build_object('id', qo.id, 'option_text', qo.option_text)) 
              FILTER (WHERE qo.id IS NOT NULL), '[]') AS options
         FROM questions q
         LEFT JOIN question_options qo ON qo.question_id = q.id
         WHERE q.survey_id = $1
         GROUP BY q.id
         ORDER BY q.id`,
        [surveyId]
    );

    return {
        ...survey.rows[0],
        questions: questionsRes.rows,
    };
};

exports.updateSurvey = async (surveyId, userId, { title, description}) => {
    const result = await db.query(
        `UPDATE surveys SET title = $1, description = $2
         WHERE id = $3 AND user_id = $4 RETURNING *`,
        [title, description, surveyId, userId]
    );
    return result.rows[0];
};

exports.deleteSurvey =async (surveyId, userId) => {
    const result = await db.query(`DELETE FROM surveys WHERE id = $1 AND user_id = $2 RETURNING *`, [surveyId, userId]);
    return result.rows[0];
};