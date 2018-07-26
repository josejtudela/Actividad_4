const Sequelize = require('sequelize');
const {
    host,
    user,
    password,
    database
} = process.env.MySQL;

// const MYSQL = require("mysql2");
// const CONN = MYSQL.createConnection({
//     host: host,
//     user: user,
//     password: password,
//     database: database
// });
const CONN = new Sequelize(`mysql://${user}:${password}@${host}:3306/${database}`)

CONN.authenticate().then(() => {
    console.log("la conexion va molto bene")
}).catch(err => {
    console.error(new Error(err))
})


module.exports = CONN;