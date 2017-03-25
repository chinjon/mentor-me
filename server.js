const express = require('express'),
path = require('path'),
// app = express(),
app = require('express')();
db = require('./models'),
passport = require('passport'),
passportConfig = require('./config/passport'),
exphbs  = require('express-handlebars');

const http = require('http');
server = http.createServer(app);
io = require('socket.io')(server);

const bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
errorhandler = require('errorhandler');

app.use(express.static('./public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const PORT = process.env.PORT || 3000;

app.set('port', PORT);

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(cookieParser())
app.set('trust proxy', 1) // trust first proxy

//need sessions to persist state of user
app.use(session({
  secret: '3or8h1o2h1o28u12o38j12',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
var routes = require('./routes/index.js');
app.use('/', routes);

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorhandler())
}


//chat
io.sockets.on('connection', function (socket){

  socket.on('connectchat', function (data, callback){
    console.log("This is new user:", data);


      db.User.findAll({
         where: {where: Sequelize.and(
            {username: data.from},
            {sendTo: data.to},
          Sequelize.or(
                {username: data.to}, 
                {sendTo: data.from}
            )
          ),
          createdAt: {
            $lt: new Date(),
            $gt: new Date(new Date() - 24 * 60 * 60 * 1000)
          }
        }
      }).then(function(results){
        console.log("Sending Old Messages.");
        socket.emit('load old messages', results);

      });
    
  });

  socket.on('send message', function(data, callback){
    console.log(data)

      db.User.create({
        username: data.from,
        sendTo: data.to,
        msg: data.msg, 
      }).then(function(results){
     
        console.log('post results: ', results);

        io.sockets.emit('new message', {msg: data.msg, nick: data.from});

      });

  });

  
});

db.sequelize.sync({ force: true }).then(function() {

  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});