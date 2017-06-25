var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');


request.get('http://api.petfinder.com/shelter.getPets?key=f260ef829527050de0b7e3d00534913b&id=TX1218&count=3&format=json',function(err,res,body){
var jsonPath = path.join(__dirname, '..', 'public', 'data.json');
 // fs.writeFileSync(jsonPath, body);
 pets = body;
 console.log(body);
});


module.exports = router;
