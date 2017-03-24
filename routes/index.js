const routes = require('express').Router();
const middleware = require('../config/middleware');
const passport = require('passport');
const db = require('../models');
const path = require('path');

routes.get('/', (req, res) => {
  res.render('index');
});

// routes.get('/dashboard', function(req, res, next) {
//   console.log('going to dashboard'); next(null);
// }, middleware.authenticated, function(req, res) {
//   res.render('dashboard', {
//     user: req.user
//   });
// });

routes.get('/sign-in', function(req, res, next) {
 // console.log('going to dashboard'); next(null);
}, middleware.authenticated, function(req, res) {
  res.render('dashboard', {
    user: req.user
  });
});


// https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

// http://www.webdeveasy.com/single-page-application-authentication/

//login a new user
routes.post('/authenticate', passport.authenticate('local', {
  // successRedirect: '/dashboard',
  successRedirect: '/login',
  failureRedirect: '/'
}));


routes.get('/logout', middleware.destroySession);

routes.get('/login', function(req, res) {
  // res.render('/');
  // req.body is returning empty
  console.log("inside login",req.user.dataValues)

  res.json(req.user.dataValues)
  // res.send(user);

  // if(user.preference === "mentor"){
  //   res.render('index', {
  //     whichPartial: ()=>{
  //       return "mentor-page";
  //     }
  //   });
  // } else if(user.preference === "mentee") {
  //   res.render('index', {
  //     whichPartial: ()=>{
  //       return "mentee-page";
  //     }
  //   })
  // }

});

// routes.get('/signup/:role', function(req, res) {
//   var role = req.params.role;
//   res.render(role+'-signup');
// });

// https://gist.github.com/chrislkeller/3230081

//create a new user
routes.post('/signup-user', function(req, res) {
//  console.log(req);
  db.User.find({where: {username: req.email}}).then(function(user) {
    if (!user) {
      db.User.create({username: req.body.username, name: req.body.name, password: req.body.password, role: req.body.role, preference: req.body.preference}).then(function(user) {
        req.logIn(user, function(err) {
          if (err) {
      //      console.log(err)
            //return res.redirect('/');
          } else {
            // res.redirect('/dashboard');   
            console.log(user.dataValues.role) 

            // if(user.dataValues.role === "mentor"){
            //   res.render
            // }


            res.json(user);
          }
        });
        
      }).catch(function(err) {
      //  console.log(err)
        res.redirect('/');
      });
    }
  });
});



module.exports = routes;