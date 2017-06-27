'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
const knex = require('../db/knex');
const bcrypt = require('bcrypt-as-promised');
var GoogleAuth = require('google-auth-library');
const saltRounds = 10;
const methodOverride = require('method-override');
router.use(methodOverride('X-HTTP-Method-Override'))


//GMAIL LOGIN
router.post('/login_gmail', async(req, res, next) => {

    let token = req.body.id_token;
    var auth = new GoogleAuth;
    var client = new auth.OAuth2('46396124230-5mojh5ic5690t3fa19dbv505p4u52lc2.apps.googleusercontent.com', '', '');
    client.verifyIdToken(
      token,
      '46396124230-5mojh5ic5690t3fa19dbv505p4u52lc2.apps.googleusercontent.com',
      function(e, login) {
        if (e) {
          console.log(e, 'error');
        }
        var payload = login.getPayload();
        var userid = payload['sub'];
        knex('handlers').where('email', payload.email).then((ret)=>{
          let permissionLevel = ret[0].permission;
          res.cookie('permission' , permissionLevel).send('Cookie is set');
        })

      });

});

//LOCAL LOGIN
router.post('/login_local', async(req, res, next) => {
  // let hashedPWD;
  knex('handlers').where('email', req.body.email).then((data)=>{
    bcrypt.compare(req.body.pwd, data[0].hashed_pwd)
    .then((ret)=>{
      if (ret) {
        let permissionLevel = data[0].permission;
        res.cookie('permission' , permissionLevel).send('Cookie is set');
      }
    })
  })

});

router.get('/', async(req, res, next) => {
  let pets
  knex('pets').then((ret) => {
    // console.log(ret);
    pets = ret;
    res.render('pages/pets', {
      pets : pets
    });
  })
  // console.log("cookies ", req.cookies);
});

router.get('/pets', function(req, res, next) {
  let pets
  knex('pets').then((ret) => {
    pets = ret;
    res.render('pages/pets', {
      pets : pets
    });
  })
});

router.get('/pets/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  let pet
  knex('pets').where('id', id).then((ret)=>{
    pet = ret[0];
    // console.log(pet, 'pet');
    res.render('pages/pet', {
      pet: pet
    })
  })
})

router.post('/pet_add', async(req, res, next) => {
  knex('pets').insert({
    status: req.body.status,
    age: req.body.age,
    size: req.body.size,
    breed: req.body.breed,
    name: req.body.name,
    sex: req.body.sex,
    description: req.body.description,
    petID: req.body.petID,
    type: req.body.type,
    photo: req.body.photo
  }, '*').then((ret) =>{
    console.log(ret, 'return');
    let pets
    knex('pets').then((ret) =>{
      pets = ret;
      res.render('pages/pets', {
        pets:pets
      })
    })
  });

});

router.get('/handlers', function(req, res, next){
  let handlers
  knex('handlers').then((ret) =>{
    handlers = ret;
    res.render('pages/handlers', {
      handlers: handlers
    })
  })
})

router.post('/handler_add', async(req, res, next) => {
  knex('handlers').insert({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    permission: req.body.permission
  }, '*').then((ret) =>{
    console.log(ret, 'return');
    let handlers
    knex('handlers').then((ret) =>{
      handlers = ret;
      res.render('pages/handlers', {
        handlers: handlers
      })
    })
  });

});

router.put('/handler_edit/:id', async(req, res, next) => {
  let id = parseInt(req.params.id);
  knex('handlers').where('id', id).update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    permission: req.body.permission
  }, '*').then((ret) =>{
    console.log(ret, 'return');
    let handlers
    knex('handlers').then((ret) =>{
      handlers = ret;
      res.render('pages/handlers', {
        handlers: handlers
      })
    })
  });

});

router.delete('/handler_delete/:id', async(req, res, next) => {
  let id = parseInt(req.body.id);
  console.log(req.body, 'return');
  knex('handlers').del().where('id', id).then((ret) =>{
    console.log(ret, 'deleted obj');
    let handlers
    knex('handlers').then((ret) =>{
      handlers = ret;
      res.render('pages/handlers', {
        handlers: handlers
      })
    })
  })

});

module.exports = router;
