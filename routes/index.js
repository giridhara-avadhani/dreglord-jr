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
    const options = {
      hostname: 'www.bungie.net',
      port: 443,
      path: '/Platform/User/GetMembershipsById/' + req.session.passport.user.membershipId + '/1/',
      method: 'GET',
      headers: {
        "X-API-Key": '2f2c53a675ac4c56a55f893a026ee040'
      }
    }
    const req = https.request(options, function (response) {
      response.on('data', (body) => {
        res.render('index', { title: 'Express',  user: JSON.stringify(body)});
      })
    })
    req.on('error', error => {
      console.error(error)
    })
  });

module.exports = router;
