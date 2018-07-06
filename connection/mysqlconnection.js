const {
    host,
    user,
    password,
    database
} = process.env.MySQL;

const MYSQL = require("mysql2");
const CONN = MYSQL.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

module.exports = CONN;