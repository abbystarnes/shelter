'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
const knex = require('../db/knex');

router.get('/', function(req, res, next) {
  res.status(200);
  res.send('fish');
})

module.exports = router;
