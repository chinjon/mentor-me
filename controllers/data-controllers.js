const express = require('express');
const db = require('../models');
const fs = require('fs')
const router = express.Router();



// get user login
router.get('/user-login-data', (req, res)=>{
    var loggedUser = req.user.dataValues.username;

    db.User.findOne({
        where: {
            username: loggedUser
        }
    }).then((data)=>{
        res.send(data)
    })
})

//  

router.get('/suggested-users/:preference/:role', (req, res)=>{
    // find all users with same preference
    var pref = req.params.preference;
    var userRole = req.params.role;

   // console.log(pref, searchRole)

   // console.log(req)
    // var userPref = req.user.dataValues.preference;
    // var userRole = req.user.dataValues.role;
    // var findRole;
    if(userRole === "mentee"){
        findRole = "mentor"
    } else if(userRole === "mentor"){
        findRole = "mentee"
    }
    // console.log(req.user.dataValues.role);
    db.User.findAll({
        where: {
            preference: pref,
            role: userRole
        }
    }).then((data)=>{
        //console.log("data is passing")
      //  console.log(data)
        res.send(data)
    })
});

module.exports = router;