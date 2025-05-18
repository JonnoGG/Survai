const db = require("../config/db.config");

exports.replaceQuestions = async (surveyId, userId, questions) => {
    const client = await db.pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(`DELETE FROM questions WHERE survey_id = $1`, [surveyId]);

        const inserted = [];
        for (const q of questions) {
            const result = await client.query(
                `INSERT INTO questions (survey_id, question_text, question_type, required)
         VALUES ($1, $2, $3, $4) RETURNING *`,
                [surveyId, q.text, q.question_type, q.required || false]
            );
            const question = result.rows[0];

            if (Array.isArray(q.options)) {
                for (const opt of q.options) {
                    await client.query(
                        `INSERT INTO question_options (question_id, option_text)
             VALUES ($1, $2)`,
                        [question.id, opt.option_text]
                    );
                }
            }

            inserted.push(question);
        }

        await client.query("COMMIT");
        return inserted;
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}