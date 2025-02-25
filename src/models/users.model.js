const db = require("../config/db.config");

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
exports.isUserTaken = async (username, email) => {
        const existingUsers = await db.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
        return existingUsers.rows.length > 0;
}

exports.createUser = async (username, email, passwordHash) => {
    return await db.query("INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)", [
        username,
        email,
        passwordHash,
    ]);
};