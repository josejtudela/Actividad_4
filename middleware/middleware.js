const express = require('express');
const app = express();
const Destinos = require('../models/destinos');
const Users = require('../models/users');
const {hash, compare} = require('bcrypt');

const error = {
    emptyFields: "Falta un campo por rellenar",
    diffPassword: "La contraseña debe ser igual",
    userNotFound: "Contraseña o nombre de usuario incorrecto"
}

const asyncPassCompare = async(hash, text) => {
    try {
        console.log(hash,text);
        const res = await compare(text, hash);
        console.log(text,(res ? '':'no'),'coincide con',hash,' => ',res);
        next();
    } catch(error) {
        console.log(error);
    }
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
    fecthAllDestinos: (req, res, next) => {
        
        Destinos.fetchAll((error, destinos) => {
            if(error) return res.status(500).send(error)
            
            req.body.destinos = destinos;
            next();
        })
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

        Users.fetchUser(params.nameUser,(error, user) => {
            if(error) return res.status(500).send(error)
            
            if(!user) {
                req.flash('error', error.emptyFields);
                res.redirect('/login');
            }
            
            let hashUser = user[0].password;
            let password = params.passOne;

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
            
            asyncPassCompare(hashUser, password);
        })
    }
}

module.exports = middleware;