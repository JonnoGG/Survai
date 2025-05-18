const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
});

exports.pool = pool;

exports.query = (text, params, callback) => {
        return pool.query(text, params, callback);
    };

