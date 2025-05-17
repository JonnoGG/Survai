const db = require("../config/db.config");
const bcrypt = require("bcrypt");

//Check that username and email are not already taken
exports.isUserTaken = async (email) => {
        const existingUsers = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        return existingUsers.rows.length > 0;
}

exports.createUser = async (email, passwordHash) => {
    return await db.query("INSERT INTO users (email, password_hash) VALUES ($1, $2)", [
        email,
        passwordHash,
    ]);
};

exports.findByEmail = async (email) => {
    const result = await db.query("SELECT id, email, password_hash FROM users WHERE email = $1", [email]);
    return result.rows[0];
}

exports.checkPassword = async (plain, hash) => {
    return await bcrypt.compare(plain, hash);
}