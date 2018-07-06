var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const Users = require('../models/users');
const Destinos = require('../models/destinos');
const {
	hash
} = require("bcrypt");

const saltRounds = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
	Destinos.fetchAll((error, destinos) => {
		if(error) return res.status(500).send(error)
		
		res.render('index', {
			destinos,
			layout: 'template'
		});
	})
});

router.get('/registro', function (req, res, next) {
	res.render('registro', {
		messages: req.flash('error'),
		layout: 'template'
	})
});

router.post('/registro', middleware.validar, function (req, res, next) {
	let userParams = Object.assign({}, req.body);

	let user = {
		user: userParams.nameUser,
		email: userParams.email,
		password: userParams.passOne
	}

	hash(userParams.passOne, saltRounds)
		.then(hashsed => {
			user.password = hashsed
			Users.insert(user, (error, userID) => {
				if (error) {
					req.flash('error', error.sqlMessage);
					res.redirect('/registro');
				} else {
					res.send("Todos OK: " + userID);
				}
			});
		})
		.catch(error => {
			req.flash('error', error);
			res.redirect('/registro');
		});
});

router.get('/login', function (req, res, next) {
	res.render('login', {
		layout: 'template'
	})
});

module.exports = router;