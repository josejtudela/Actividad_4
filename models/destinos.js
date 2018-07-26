const Sequelize = require('sequelize');
const CONN = require('../connection/mysqlconnection');

const Destinations = CONN.define('destinations', {
    name: Sequelize.STRING,
    reserve: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    img: Sequelize.STRING
});

Destinations.sync({force: false})
    .then(() => {
        console.log("sync Destination OK")
    })
    
module.exports = Destinations;

    // Destinos.fetchAll = (callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("SELECT * FROM destinos;", (error, rows) => {
    //         if (error) return callback(error);
    
    //         return callback(null, rows);
    //     })
    // }
    
    // Destinos.insert = (DESTINO, callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("INSERT INTO destinos SET ?", [USER], (error, result) => {
    //         if (error) return callback(error);
    
    //         return callback(null, result.insertId);
    //     })
    // }
    
    // Destinos.deleteAll = (callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("TRUNCATE TABLE destinos", (error, result) => {
    //         if (error) return callback(error);
    
    //         return callback(null, result);
    //     })
    // }
    
    // Destinos.count = (nameTable, callback) => {
    //     if (!CONN) return callback(conError);
    
    //     CONN.query("SELECT COUNT(*) as total FROM " + nameTable + ";", (error, count) => {
    //         if (error) return callback(error);
    
    //         return callback(null, count[0].total);
    //     });
    // }