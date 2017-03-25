var bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true}},
    name: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true}},
    password: { type: DataTypes.STRING, unique: false, allowNull: false, validate: { notEmpty: true}},
    role: { type: DataTypes.STRING, unique: false, allowNull: false, validate: { notEmpty: true}},
    preference: { type: DataTypes.STRING, unique: false, allowNull: false, validate: { notEmpty: true}},
    message: { type: DataTypes.STRING },
    sendTo: { type: DataTypes.STRING }

  },{
    classMethods: {
      validPassword: function(password, passwd, callback) {
        console.log('validPassword password', password);
        console.log('validPassword passwd', passwd);
        bcrypt.compare(password, passwd, function(err, isMatch) {
       //   console.log('isMatch', isMatch);
          if (isMatch) {
            console.log('found match');
            return callback(null, true);
          } else {
            console.log('returning false');
            return callback(null, false);
          }
        });
      }
    }
  }, {
    dialect: 'mysql'
  });

  User.hook('beforeCreate', function(user, {}, next) {

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) {
          return next(err);
        }  
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
              return next(err);
            }      
            user.password = hash;
          //  console.log('hash', hash);
            return next(null, user);
        });
    });
  });


  return User;
};