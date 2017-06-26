'use strict'

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('route');
const data = require('./routes/data');
const route = require('./routes/route');
const path = require('path');
const fs = require('fs');
const knex = require('./db/knex.js')
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

const cookieParser = require('cookie-parser')
app.use(cookieParser('secret'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// passport.use(new GoogleStrategy({
//     consumerKey: '46396124230-5mojh5ic5690t3fa19dbv505p4u52lc2.apps.googleusercontent.com',
//     consumerSecret: 'mhmd-a9orS52t1VA5MKx6250',
//     callbackURL: "/"
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         console.log(user, 'user');
//         return done(err, user);
//       });
//   }
// ));

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
//
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/');
// });

// app.use(data);
app.use(route);



app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
