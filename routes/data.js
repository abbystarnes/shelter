var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
let data

request.get('http://api.petfinder.com/shelter.getPets?key=f260ef829527050de0b7e3d00534913b&id=TX1218&format=json',function(err,res,body){
var jsonPath = path.join(__dirname, '..', 'public', 'data.json');
console.log(jsonPath, 'path');
// console.log(data, 'data');

 fs.writeFileSync(jsonPath, body);
});


module.exports = router;
