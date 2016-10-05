var express = require('express');
var bcrypt = require('bcryptjs');
var router = express.Router();
var User = require('../database/mongo.js');
var csrf = require('csurf');

router.use(csrf());
router.use(function(req, res, next) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (err) {
        //do nothing;
      }
      if (user) {
        req.user = user;
        delete req.user.password;
        req.session.user = req.user;
        res.locals.user = req.user;
      }
      next();
    });
  } else {
    next();
  }
});

function requireLogin (req, res, next) {
  if (!req.user) {
    req.session.reset();
    res.redirect('/login');
 } else {
   next();
 }
}

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/login', function(req, res) {
    res.render('login', { csrfToken: req.csrfToken() });
});

router.post('/login', function(req, res) {
    User.findOne({ email: req.body.email}, function(err, user) {
        if (err) {
            //yes there's an error
        }
        if (!user) {
            res.render('login', { error: "Invalid email or password", csrfToken: req.csrfToken()});
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.render('login', { error: "Invalid email or password", csrfToken: req.csrfToken()});
            }
        }
    });
});

router.get('/dashboard', requireLogin, function(req, res) {
     res.render('dashboard.jade');
});

router.get('/register', function(req, res) {
    res.render('register', { csrfToken: req.csrfToken() });
});

router.post('/register', function(req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    });

    user.save(function(err) {
        if (err) {
            var error = "Something bad happened! Please try again later.";
            if (err.code === 11000) {
                error = "email already taken, try with another one!";
            }
            res.render("register.jade", { error: error, csrfToken: req.csrfToken()});
        } else {
            res.redirect("/dashboard");
        }
    });
});

router.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/');
});

module.exports = router;