var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const Destinations = require('../models/destinos');

router.get('/', (req, res) => {
    Destinations.findAll().then((destinos) => {
		res.render('adminPanel', {
			destinos,
			user: {name: req.session.username},
			layout: 'template'
		});
	})
});

module.exports = router;