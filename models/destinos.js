let CONN = require('../connection/mysqlconnection');

let Destinos = {};
let conError = "No se ha podido conectar a la base de datos";

Destinos.fetchAll = (callback) => {
    if (!CONN) return callback(conError);

    CONN.query("SELECT * FROM destinos;", (error, rows) => {
        if (error) return callback(error);

        return callback(null, rows);
    })
}

Destinos.insert = (DESTINO, callback) => {
    if (!CONN) return callback(conError);

    CONN.query("INSERT INTO destinos SET ?", [USER], (error, result) => {
        if (error) return callback(error);

        return callback(null, result.insertId);
    })
}

Destinos.deleteAll = (callback) => {
    if (!CONN) return callback(conError);

    CONN.query("TRUNCATE TABLE destinos", (error, result) => {
        if (error) return callback(error);

        return callback(null, result);
    })
}

Destinos.count = (nameTable, callback) => {
    if (!CONN) return callback(conError);

    CONN.query("SELECT COUNT(*) as total FROM " + nameTable + ";", (error, count) => {
        if (error) return callback(error);

        return callback(null, count[0].total);
    });
}

module.exports = Destinos;