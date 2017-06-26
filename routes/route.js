'use strict'
var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
const path = require('path');
const knex = require('../db/knex');

var GoogleAuth = require('google-auth-library');


// get email (gmail) OR email & pwd
  // set cookie to auth level of user by email
// * user
// user logs in
// get user email from login page, set cookie

// 1 - /pets, /pet

// 2 - /pets, /pet, /pet/edit, /employee/edit
// 3 - /pets, /pet, /pet/edit, /pet/add, /pet/delete, /employees, /employee/edit/add/delete

// get user level of acces based on email
// if level of access is volunteer, display view options
// if level foster, display display view, edit
// if level employee, display view, edit, add, delete

// router.get('/cookie',function(req, res){
//      res.cookie('lava' , 'puppy').send('Cookie is set');
// });

//GMAIL LOGIN
router.post('/login_gmail', async(req, res, next) => {
  // console.log(req, 'req');
  // console.log(req.body.id_token, 'id');
  // console.log(req.body.email, 'email');
  knex('handlers').where('email', 'ordette.starnes@gmail.com').then((ret)=>{
    // console.log(ret[0], 'ret');
    let handlerID = ret[0].id;
    let token = req.body.id_token;

    var auth = new GoogleAuth;
    var client = new auth.OAuth2('46396124230-5mojh5ic5690t3fa19dbv505p4u52lc2.apps.googleusercontent.com', '', '');
    client.verifyIdToken(
      token,
      '46396124230-5mojh5ic5690t3fa19dbv505p4u52lc2.apps.googleusercontent.com',
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
      function(e, login) {
        console.log(e, 'error');
        var payload = login.getPayload();
        var userid = payload['sub'];
        console.log(payload, 'payload');
        console.log(userid, 'userid');
        var domain = payload['hd'];
      });

      res.send(req.body.email)
  })

  // if token is valid OR password = stored salted password
  // use salted password OR id_token to login
  // -- > generate cookie based on id_token,
});

//LOCAL LOGIN
router.post('/login_local', async(req, res, next) => {
  console.log('local login');
  console.log(req.body, 'req body');
  let pets
  knex('pets').then((ret) => {
    // console.log(ret);
    pets = ret;
    res.render('pages/pets', {
      pets : pets
    });
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
  let id = typeof(req.params.id);
  console.log(id);
  let pet
  knex('pets').where('id', 25).then((ret)=>{
    pet = ret[0];
    console.log(pet, 'pet');
    res.render('pages/pet', {
      pet: pet
    })
  })
})

module.exports = router;
