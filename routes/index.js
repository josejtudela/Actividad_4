var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const Users = require('../models/users');
const Destinations = require('../models/destinos');

const {
	hash, compare
} = require("bcrypt");

const saltRounds = 10;

/* GET home page. */
router.get('/',function (req, res, next) {
	Destinations.findAll().then((destinos) => {
		res.render('index', {
			destinos,
			user: {name: req.session.username},
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

router.post('/registro', middleware.validarRegistro, function (req, res, next) {
	let userParams = Object.assign({}, req.body);

	let user = {
		user: userParams.nameUser,
		email: userParams.email,
		password: userParams.passOne
	}

	hash(userParams.passOne, saltRounds)
		.then(hashsed => {
			user.password = hashsed
			Users.findOrCreate({
				where: {user: user.user},
				defaults: {
					email: user.email,
					password: user.password
				}
			}).spread((user, created) => {
				if(!created){
					req.flash('error', `El usuario ya existe`);
					res.redirect('/registro');
				}
				req.session.username = user.user;
				res.redirect('/');
			})

		})
		.catch(error => {
			req.flash('error', error);
			res.redirect('/registro');
		});
});

router.get('/login', function (req, res, next) {

	res.render('login', {
		messages: req.flash('error'),
		layout: 'template'
	})
});

router.post('/login',middleware.validarLoginAndFecthUser, function (req, res, next) {
	req.session.username = req.body.nameUser;
	res.redirect('/');
});

module.exports = router;