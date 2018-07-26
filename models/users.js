const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconnection');

const Users = CONN.define('users', {
    user: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    auth_token: Sequelize.STRING
});

Users.sync({force: false})
    .then(() => {
        console.log("sync User OK")
    })

module.exports = Users;
    // Users.fetchAll = (callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("SELECT * FROM users;", (error, rows) => {
    //         if (error) return callback(error);
    
    //         return callback(null, rows);
    //     })
    // }
    
    // Users.fetchUser = (USER, callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("SELECT * FROM users WHERE user=?;",[USER], (error, user) => {
    //         if (error) return callback(error);
    
    //         return callback(null, user);
    //     })
    // }
    
    // Users.insert = (USER, callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("INSERT INTO users SET ?", [USER], (error, result) => {
    //         if (error) return callback(error);
    
    //         return callback(null, result.insertId);
    //     })
    // }
    
    // Users.deleteAll = (callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("TRUNCATE TABLE users", (error, result) => {
    //         if (error) return callback(error);
    
    //         return callback(null, result);
    //     })
    // }
    
    // Users.count = (nameTable, callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("SELECT COUNT(*) as total FROM " + nameTable + ";", (error, count) => {
    //         if (error) return callback(error);
    
    //         return callback(null, count[0].total);
    //     });
    // }