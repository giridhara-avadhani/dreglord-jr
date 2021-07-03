var express = require('express');
var router = express.Router();

var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/auth/bungie', passport.authenticate('bungie-auth'));
router.get('/auth/bungie/callback', passport.authenticate('bungie-auth', {
  failureRedirect: '/auth/provide' }), function(req, res) {
    // Successful authentication, redirect home.
    console.log(JSON.stringify(req));
    res.redirect('/');
  });

module.exports = router;
