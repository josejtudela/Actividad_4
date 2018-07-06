var express = require('express');
var router = express.Router();
const middleware = require('../middleware/middleware');
const Users = require('../models/users');

/* GET home page. */
router.get('/', function (req, res, next) {
  const destinos = [
    {name: 'Madrid', save: 90, price: 359, img: 'madrid_opt.JPG'},
    {name: 'Buenos Aires', save: 75, price: 729, img: 'buenos_aires_opt.JPG'},
    {name: 'Ciudad de Mexico', save: 35, price: 519, img: 'ciudad_mexico_opt.JPG'},
    {name: 'New York', save: 65, price: 329, img: 'new_york_opt.JPG'},
    {name: 'Tokyo', save: 95, price: 199, img: 'tokyo_opt.JPG'},
    {name: 'Beijing', save: 50, price: 659, img: 'beijing_opt.JPG'}
  ];
  res.render('index', {
    destinos,
    layout: 'template'
  });
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

  Users.insert(user,(error, userID) => {
    if(error){
      req.flash('error', error.sqlMessage);
      res.redirect('/registro');
    } else {
      res.send("Todos OK: "+userID);
    }
  });
  
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    layout: 'template'
  })
});

module.exports = router;