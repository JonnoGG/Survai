const db = require("../config/dbConfig"); 

exports.getAllUsers = async (req, res) => {
    res.write("This is the all users route");
    try {
        const result = await db.query('SELECT * FROM users ORDER BY id ASC LIMIT 1');
        const user = result.rows[0];
        const username = String(user.username);
        res.write('\n' + username);
    } catch (e) {
        res.write('Error fetching users.')
    }
    res.send();
};
