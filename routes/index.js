const routes = require('express').Router();
const middleware = require('../config/middleware');
const passport = require('passport');
const db = require('../models');

routes.get('/', (req, res) => {
  res.render('index');
});

routes.get('/dashboard', function(req, res, next) {
  console.log('going to dashboard'); next(null);
}, middleware.authenticated, function(req, res) {
  res.render('dashboard', {
    user: req.user
  });
});


//login a new user
routes.post('/authenticate', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/'
}));


routes.get('/logout', middleware.destroySession);

routes.get('/login', function(req, res) {
  res.render('/');
});

routes.get('/signup/:role', function(req, res) {
  var role = req.params.role;
  res.render(role+'-signup');
});

//create a new user
routes.post('/signup-user', function(req, res) {
  db.User.find({where: {username: req.username}}).then(function(user) {
    if (!user) {
      db.User.create({username: req.body.username, password: req.body.password, role: req.body.role}).then(function(user) {
        req.logIn(user, function(err) {
          if (err) {
            console.log(err)
            //return res.redirect('/');
          } else {
            res.redirect('/dashboard');    
            // res.json(user);
          }
        });
        
      }).catch(function(err) {
        console.log(err)
        res.redirect('/');
      });
    }
  });
});



module.exports = routes;