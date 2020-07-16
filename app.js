var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'); //for http messages
const bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promotionRouter = require('./routes/promotionRouter');
var leaderRouter = require('./routes/leaderRouter');
const mongoose = require('mongoose');  //DBM strict schema
mongoose.Promise= require('bluebird'); //Promise control

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect= mongoose.connect(url, {useMongoClient: true});

connect.then((db) => {
  console.log("Connection ok to the server");
}, (err) => {console.log(err);});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.json());// now express does body parsing itself no need to download seperate body parser module
//app.use(express.urlencoded({ extended: true }));
//app.use(cookieParser('12345-6890-09876-54221'));
app.use(session({
  name: 'session-id',
  secret: '12345-6890-09876-54221',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

function auth(req,res,next) {
  console.log(req.session);

if(!req.session.user) {

  var authHeader = req.headers.authorization;

  if(!authHeader) {
    var err = new Error("You are not authenticated");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status =401;
    return next(err);
  }

  var auth = new Buffer(authHeader.split(' ')[1],'base64').toString('utf-8').split(':');
  var username = auth[0];
  var password = auth[1];

  if(username == 'admin' && password == 'password'){
    req.session.user = 'admin';
    next();
  }
  else{
    var err = new Error("You are not authenticated");
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status =401;
    return next(err);
  }
}  
else{
  if(req.session.user === 'admin') {
    next();
  }
  else
  {
    var err = new Error("You are not authenticated");
    err.status =401;
    return next(err);
  }
}
}

app.use(auth);
//use static data from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes', dishRouter);
app.use('/promotions', promotionRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
