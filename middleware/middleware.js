const express = require('express');
const app = express();
const error = {
    emptyFields: "Falta un campo por rellenar",
    diffPassword: "La contraseña debe ser igual"
}

let middleware = {
    validar: (req, res, next) => {
        let params = Object.assign({}, req.body);

        let fillFields = Object.keys(params).every(key => {
            return params[key] !== "";
        })

        if (!fillFields || params.acept.checked === false) {
            req.flash('error', error.emptyFields);
            res.redirect('/registro');
        }

        if (params.passOne !== params.passTwo) {
            req.flash('error', error.diffPassword);
            res.redirect('/registro');
        }

        next();
    }
}

module.exports = middleware;