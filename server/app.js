const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const api = require('./routes/api');
const login = require('./routes/login');
const join = require('./routes/join');

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', login);
app.use('/join', join);

// route middleware to verify a token
app.use(function(req, res, next) {
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token){
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if(err){ 
        return res.json({ success: false, message: 'Failed to authenticate token.' });  
      }   
      else {
        req.decoded = decoded;    
        next();
      }
    });
  } 
  else{
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});


app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({success : false , error: err.status});
});

module.exports = app;
