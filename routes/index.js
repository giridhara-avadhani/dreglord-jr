var express = require('express');
const https = require('https');
var router = express.Router();

var passport = require('passport');
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = "";
  console.log(req.session);
  if (!req.session || !req.session.passport || !req.session.passport.user  || !req.session.passport.user.membershipId) {
    res.render('index', { title: 'Express',  user: user });
  } else {
    
  }
});

router.get('/auth/bungie', passport.authenticate('bungie-auth'));
router.get('/auth/bungie/callback', passport.authenticate('bungie-auth', {
  failureRedirect: '/auth/provide' }), function(req, res) {
    // Successful authentication, redirect home.
    https.get({
      hostname: 'https://www.bungie.net/Platform/User/GetMembershipsById/' + req.session.passport.user.membershipId + '/2/',
      headers: {
        "X-API-Key": '2f2c53a675ac4c56a55f893a026ee040'
      }
    }, function (error, response, body) {
        res.render('index', { title: 'Express',  user: JSON.stringify(body)});
        if (!error && response.statusCode === 200) {
            console.log(body) // Print the google web page.
        }
    })
  });

module.exports = router;
