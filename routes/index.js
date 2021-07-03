var express = require('express');
const https = require('https');
var router = express.Router();

var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = "";
  if (!req.session || !req.session.passport || !req.session.passport.user  || !req.session.passport.user.membershipId) {
    res.render('index', { title: 'Express',  user: user });
  } else {
    console.log(req.session);
    https.get({
      hostname: 'https://www.bungie.net/Platform/Destiny2/User/GetBungieNetUserById/' + req.session.passport.user.membershipId,
      headers: {
        "X-API-Key": '2f2c53a675ac4c56a55f893a026ee040'
      }
    },function (error, response, body) {
        res.render('index', { title: 'Express',  user: JSON.stringify(body)});
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the google web page.
        }
    })
  }
});

router.get('/auth/bungie', passport.authenticate('bungie-auth'));
router.get('/auth/bungie/callback', passport.authenticate('bungie-auth', {
  failureRedirect: '/auth/provide' }), function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.session);
    res.redirect('/');
  });

module.exports = router;
