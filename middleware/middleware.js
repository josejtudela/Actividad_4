const express = require('express');
const app = express();
const Destinations = require('../models/destinos');
const Sequelize = require('sequelize');
const Users = require('../models/users');
const CONN = require('../connection/mysqlconnection');
const {hash, compare} = require('bcrypt');

const error = {
    emptyFields: "Falta un campo por rellenar",
    diffPassword: "La contraseña debe ser igual",
    userNotFound: "Contraseña o nombre de usuario incorrecto"
}

let middleware = {
    validarRegistro: (req, res, next) => {
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
    },
    validarLoginAndFecthUser: (req, res, next) => {
        let params = Object.assign({}, req.body);

        let fillFields = Object.keys(params).every(key => {
            return params[key] !== "";
        })

        if (!fillFields) {
            req.flash('error', error.emptyFields);
            res.redirect('/login');
        }

        const asyncPassCompare = async(hash, text) => {
            try {
                const result = await compare(text, hash);
                if(result){
                    next();
                } else {
                    req.flash('error', error.userNotFound);
                    res.redirect('/login');
                }
            } catch(error) {
                console.log(error);
            }
        }

        Users.findOne({where: {
            user: params.nameUser}
        })
        .then(user => {
            asyncPassCompare(user.dataValues.password, params.passOne);
        })
        .catch(err => {
            req.flash('error', error.userNotFound);
            res.redirect('/login');
        })
    }
}

module.exports = middleware;