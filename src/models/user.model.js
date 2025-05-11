const db = require("../config/db.config");
const bcrypt = require("bcrypt");

// exports.getFirstUser = async (req, res) => {
//     res.write("This is the all users route");
//     try {
//         const result = await db.query("SELECT * FROM users ORDER BY id ASC LIMIT 1");
//         const user = result.rows[0];
//         const username = String(user.username);
//         res.write("\n" + username);
//     } catch (e) {
//         res.write("Error fetching users.");
//     }
//     res.send();
// };

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