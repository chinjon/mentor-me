const express = require('express'),
path = require('path'),
app = express(),
db = require('./models'),
passport = require('passport'),
passportConfig = require('./config/passport'),
exphbs  = require('express-handlebars');

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


db.sequelize.sync({ force: false }).then(function() {

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

app.get('/chat-page', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/chat.html'));
});