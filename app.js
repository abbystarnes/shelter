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
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt-as-promised');
const saltRounds = 10;

var GoogleAuth = require('google-auth-library');

app.use(methodOverride('_method'))
app.use(cookieParser('secret'))
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(data);
app.use(route);



app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app
