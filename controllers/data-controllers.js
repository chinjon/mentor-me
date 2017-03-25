const express = require('express');
const db = require('../models');

const router = express.Router();




// get user login
router.get('/user-login-data', (req, res)=>{
   // console.log(req);
    // var loggedUser = req.user.dataValues.username;
    db.User.findOne({
        // where: {
        //     username: loggedUser
        // }
    }).then((data)=>{
        //console.log(data.dataValues)
        res.json(data)
    })
})

//  

router.get('/suggested-users', (req, res)=>{
    // find all users with same preference
    // var userPref = req.user.dataValues.preference;
    // var userRole = req.user.dataValues.role;
  
    console.log(req.User)

    db.User.findAll({
        where: {
            // preference: userPref,
            // role: {
            //     $notLike: userRole
            // }
        }
    }).then((data)=>{
        //console.log("data is passing")
        // console.log(data)
        res.json(data)
    })
});

module.exports = router;