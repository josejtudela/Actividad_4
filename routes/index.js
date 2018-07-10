var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const Users = require('../models/users');

const {
	hash, compare
} = require("bcrypt");

const saltRounds = 10;

/* GET home page. */
router.get('/', middleware.fecthAllDestinos ,function (req, res, next) {
	// Destinos.fetchAll((error, destinos) => {
	// 	if(error) return res.status(500).send(error)
		let destinos = req.body.destinos;
		console.log(req.session.username)
		res.status(200).render('index', {
			destinos,
			user: {name: req.session.username},
			layout: 'template'
		});
	// })

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
			Users.insert(user, (error, userID) => {
				if (error) {
					req.flash('error', error.sqlMessage);
					res.redirect('/registro');
				} else {
					req.session.username = user.user;
					res.redirect('/');
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
		messages: req.flash('error'),
		layout: 'template'
	})
});

router.post('/login',middleware.validarLoginAndFecthUser, function (req, res, next) {
	req.session.username = req.body.nameUser;
	res.redirect('/');
});

module.exports = router;