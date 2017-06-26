'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
const knex = require('../db/knex');

let myData;
let pets;
var jsonPath = path.join(__dirname, '..', 'public', 'data.json');
let petsData = fs.readFileSync(jsonPath, 'utf8', function (err, data){
  if (err) throw err;
});
myData = JSON.parse(petsData)
pets = myData.petfinder.pets.pet;

let petObjArray = [];
for (let x = 0; x < pets.length; x ++){
    let petObj = {};
    let pet = myData.petfinder.pets.pet[x];
    let status = Object.values(pet.status)[0];
    let age = Object.values(pet.age)[0];
    let size = Object.values(pet.size)[0];
    let breed = Object.values(pet.breeds.breed)[0];
    let name = Object.values(pet.name)[0];
    let sex = Object.values(pet.sex)[0];
    let description = Object.values(pet.description)[0];
    let petID = Object.values(pet.id)[0];
    let type = Object.values(pet.animal)[0];
    let photo
    let hasPhoto = false;

// console.log(petObj);
    for (let y = 0; y < pet.media.photos.photo.length; y ++){
      if (hasPhoto === false && pet.media.photos.photo[y]['@size'] === 'x'){
        photo = pet.media.photos.photo[y]['$t'];
        hasPhoto = true;
      }
    }

    if (status === 'A') {
      status = 'Available'
    }
    if (sex === 'M'){
      sex = 'Male'
    }
    if (sex === 'F'){
      sex = 'Female'
    }

    petObj.status = status;
    petObj.age = age;
    petObj.size = size;
    petObj.breed = breed;
    petObj.name = name;
    petObj.sex = sex;
    petObj.description = description;
    petObj.petID = petID;
    petObj.type = type;
    petObj.photo = photo;

    petObjArray.push(petObj);


    // console.log(type);

    // knex('pets').insert({
    //   status: status,
    //   age: age,
    //   size: size,
    //   breed: breed,
    //   name: name,
    //   sex: sex,
    //   description: description,
    //   petID: petID,
    //   type: type,
    //   photo: photo
    // }, '*').then((ret) => {
    //   console.log(ret[0], 'object');
    // });

    // table.string('status');
    // table.string('age');
    // table.string('size');
    // table.string('breed');
    // table.string('name');
    // table.string('sex');
    // table.text('description');
    // table.integer('petID');
    // table.string('type');
    // table.string('photo');

//     knex('books').insert({
//   title: req.body.title,
//   genre: req.body.genre,
//   description: req.body.description,
//   book_cover_url: req.body.url
// }, '*').then((ret) => {
}
console.log(petObjArray);

module.exports = router
