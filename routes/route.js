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
          if (ret[0]) {
            let permissionLevel = ret[0].permission;
            res.cookie('permission' , permissionLevel).send('Cookie is set');
          }
          else {
            console.log('no handler has this gmail');
          }
        })

      });

});

//LOCAL LOGIN
router.post('/login_local', async(req, res, next) => {
  // let hashedPWD;
  knex('handlers').where('email', req.body.email).then((data)=>{
    if (data[0]) {
      bcrypt.compare(req.body.pwd, data[0].hashed_pwd)
      .then((ret)=>{
        if (ret) {
          let permissionLevel = data[0].permission;
          if (permissionLevel) {
            res.cookie('permission' , permissionLevel).send('Cookie is set');
          } else {
            console.log('no permission level associated with profile');
          }
        }
      }).catch(bcrypt.MISMATCH_ERROR, function(){
        console.log('password not a match');
      })
    } else {
      console.log('no database emails match given email');
    }
  })

});

router.get('/', async(req, res, next) => {
  let pets
  let join
  knex('pets').then((ret) => {
    pets = ret;
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      // console.log(join);
      res.render('pages/pets', {
        pets : pets,
        join : join
      });
    })
  })
});

router.get('/pets', function(req, res, next) {
  let pets
  let join
  knex('pets').then((ret) => {
    pets = ret;
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      // console.log(join);
      res.render('pages/pets', {
        pets : pets,
        join : join
      });
    })
  })
});

router.get('/pets/:id', function(req, res, next){
  let id = parseInt(req.params.id);
  let pet
  let join
  knex('pets').where('id', id).then((ret)=>{
    pet = ret[0];
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      // console.log(join);
      res.render('pages/pet', {
        pet : pet,
        join : join
      });
    })
  })
})

router.post('/pet_add', async(req, res, next) => {
let foster_name = req.body.foster_name;
let foster_email = req.body.foster_email;
let foster_id;
let age = req.body.age;
let petID = req.body.petID;
if (!age){
  age = 0;
}
if (!petID){
  petID = 0;
}

knex('handlers').join('handlers_pets', 'handlers_id', 'handlers.id').then((ret)=>{
  // console.log(ret, 'joined handlers');
  for (let x = 0; x < ret.length; x++){
    if (ret[x].email === foster_email) {
      foster_id = ret[x].handlers_id;
    }
  }

    knex('pets').insert({
      status: req.body.status,
      age: age,
      size: req.body.size,
      breed: req.body.breed,
      name: req.body.name,
      sex: req.body.sex,
      description: req.body.description,
      petID: petID,
      type: req.body.type,
      photo: req.body.photo
    }, '*').then((ret) =>{
      // console.log(ret[0], 'new pet');
      // console.log(foster_id, 'foster id');
      let pet = ret[0];
      // console.log(pet.id, 'pet id');
      knex('handlers_pets').insert ({
        handlers_id:foster_id,
        pets_id:pet.id
      }).then((ret)=>{
      knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers', 'handlers.id', 'handlers_id').then((join) =>{

        res.render('pages/pet', {
          pet:pet,
          join: join
        })
      })
    })
    });

})




});

router.put('/pet_edit/:id', async(req, res, next) => {
  let id = parseInt(req.params.id);
  knex('pets').where('id', id).update({
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
    let pet = ret[0];
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      let join = returned;
      // console.log(join);
      res.render('pages/pet', {
        pet : pet,
        join : join
      });
    })
  });

});

router.delete('/pet_delete/:id', async(req, res, next) => {
  let id = parseInt(req.body.id);
  // console.log(req.body, 'return');
  knex('pets').del().where('id', id).then((ret) =>{
    // console.log(ret, 'deleted obj');
    let pets
    knex('pets').then((ret) =>{
      pets = ret;
      res.render('pages/pets', {
        pets: pets
      })
    })
  })

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
    // console.log(ret, 'return');
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
    // console.log(ret, 'return');
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
  // console.log(req.body, 'return');
  knex('handlers').del().where('id', id).then((ret) =>{
    // console.log(ret, 'deleted obj');
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
