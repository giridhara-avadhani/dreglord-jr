var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

passport.use('bungie-auth', new OAuth2Strategy({
  authorizationURL: 'https://www.bungie.net/en/OAuth/Authorize',
  tokenURL: 'https://www.bungie.net/platform/app/oauth/token/',
  clientID: '37015',
  clientSecret: 'hESrkryUz2h9gq5MGwqxlinCReUouFiKcVkPWFjc-5w',
  callbackURL: 'https://dreglord-jr.herokuapp.com/auth/bungie/callback'
},
function(accessToken, refreshToken, membershipId, done) {
  console.log(accessToken, refreshToken, membershipId);
  done(null, accessToken);
}
));

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
