const express = require('express');
const db = require('../models');
const fs = require('fs')
const router = express.Router();


// router.get('/', (req, res)=>{
//     // db.User
//     // need to make a call for current user?
//     // or req.body will contain user info?
// })

// get user login
router.get('/user-login-data', (req, res)=>{
    var loggedUser = req.user.dataValues.username;

    db.User.findOne({
        where: {
            username: loggedUser
        }
    }).then((data)=>{
        res.json(data)
    })
})

//  

router.get('/suggested-users', (req, res)=>{
    // find all users with same preference
    var userPref = req.user.dataValues.preference;
    var userRole = req.user.dataValues.role;
    var findRole;
    if(userRole === "mentee"){
        findRole = "mentor"
    } else if(userRole === "mentor"){
        findRole = "mentee"
    }
    // console.log(req.user.dataValues.role);
    db.User.findAll({
        where: {
            preference: userPref,
            role: findRole
        }
    }).then((data)=>{
        //console.log("data is passing")
        console.log(data)
        res.json(data)
    })
});

module.exports = router;