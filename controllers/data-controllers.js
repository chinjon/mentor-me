const express = require('express');
const db = require('../models');

const router = express.Router();

// https://stackoverflow.com/questions/31905684/dynamic-partial-in-handlebars
// http://handlebarsjs.com/partials.html
// https://mandrill.zendesk.com/hc/en-us/articles/205582537-Using-Handlebars-for-Dynamic-Content
// https://zordius.github.io/HandlebarsCookbook/0028-dynamicpartial.html

// https://www.reddit.com/r/node/comments/4ieetf/handling_multiple_sequelize_queries/d2xewcw/

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
        console.log(data.dataValues)
        res.json(data)
    })
})

//  

router.get('/suggested-users', (req, res)=>{
    // find all users with same preference
    var userPref = req.user.dataValues.preference;
    var userRole = req.user.dataValues.role;
    // console.log(req.user.dataValues.role);
    db.User.findAll({
        where: {
            preference: userPref,
            role: {
                $notLike: userRole
            }
        }
    }).then((data)=>{
        //console.log("data is passing")
        console.log(data)
        res.json(data)
    })
});

module.exports = router;