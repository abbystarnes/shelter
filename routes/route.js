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

router.get('/handlers', function(req, res, next){
  let handlers
  knex('handlers').then((ret) =>{
    handlers = ret;
    console.log(handlers);
    res.render('pages/handlers', {
      handlers: handlers
    })
  })


})

module.exports = router;
