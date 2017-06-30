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

router.get('/logout', async(req, res, next) => {
  res.cookie('permission' , '')
  res.cookie('email' , '');
  let pets
  let join
  knex('pets').then((ret) => {
    pets = ret;
    console.log(res.cookie, 'cookie');
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      // console.log(join);
      res.status(200);
      res.render('pages/pets', {
        pets : pets,
        join : join
      });
    })
  })
})

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
            let email = ret[0].email;
            res.cookie('permission' , permissionLevel)
            res.cookie('email' , email);
            // res.status(302);
            // res.send('Cookie is set')

            let pets
            let join
            knex('pets').then((ret) => {
              pets = ret;
              console.log(res.cookie, 'cookie');
              knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
                // console.log(returned, 'joined');
                join = returned;
                // console.log(join);
                res.status(302);
                res.render('pages/pets', {
                  pets : pets,
                  join : join
                });
              })
            })
          }
          else {
            console.log('no handler has this gmail');
            let permissionLevel = '';
            let email = '';
            res.cookie('permission' , permissionLevel);
            res.cookie('email' , email);
            // res.status(302);
            // res.send('No Permission Level');
            let pets
            let join
            knex('pets').then((ret) => {
              pets = ret;
              console.log(res.cookie, 'cookie');
              knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
                // console.log(returned, 'joined');
                join = returned;
                // console.log(join);
                res.status(404);
                res.render('pages/pets', {
                  pets : pets,
                  join : join
                });
              })
            })
          }
        })
      });
});

//LOCAL LOGIN
router.post('/login_local', async(req, res, next) => {
  knex('handlers').where('email', req.body.email).then((data)=>{
    if (data[0]) {
      bcrypt.compare(req.body.pwd, data[0].hashed_pwd)
      .then((ret)=>{
        if (ret) {
          let permissionLevel = data[0].permission;
          let email = data[0].email;
          console.log(permissionLevel, 'permission level');
          if (permissionLevel) {
            res.cookie('permission' , permissionLevel)
            res.cookie('email' , email);
            // res.status(302);
            // res.send('Cookie is set')

            let pets
            let join
            knex('pets').then((ret) => {
              pets = ret;
              console.log(res.cookie, 'cookie');
              knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
                // console.log(returned, 'joined');
                join = returned;
                // console.log(join);
                res.status(302);
                res.render('pages/pets', {
                  pets : pets,
                  join : join
                });
              })
            })
          } else {
            console.log('no permission level associated with profile');
            // res.status(302);
            // res.send('No permission level')

            let pets
            let join
            knex('pets').then((ret) => {
              pets = ret;
              console.log(res.cookie, 'cookie');
              knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
                // console.log(returned, 'joined');
                join = returned;
                // console.log(join);
                res.status(404);
                res.render('pages/pets', {
                  pets : pets,
                  join : join
                });
              })
            })
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

// A - ALL // E - EDIT, DELETE, MANAGE HANDLERS
router.get('/', async(req, res, next) => {
  let pets
  let join
  knex('pets').then((ret) => {
    pets = ret;
    console.log(res.cookie, 'cookie');
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      // console.log(join);
      res.status(200);
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
  console.log('here');
  let id = parseInt(req.params.id);
  let pet
  let join
  knex('pets').where('id', id).then((ret)=>{
    pet = ret[0];
    knex('pets').join('handlers_pets', 'pets_id', 'pets.id').join('handlers','handlers_id','handlers.id').then((returned)=>{
      // console.log(returned, 'joined');
      join = returned;
      console.log(join);
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
  let foster_email = req.body.foster_email;
  let foster_name = req.body.foster_name;
  knex('handlers').join('handlers_pets', 'handlers_id', 'handlers.id').where('email', foster_email).then((ret)=>{
    let handlers_id = ret[0].handlers_id;
    // console.log(handlers_id, 'handlers id');
    knex('handlers_pets').where('pets_id', id).update({
      handlers_id: handlers_id
    }).then((myRet)=>{
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
        // console.log(ret, 'return');
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
  });

});

router.delete('/pet_delete/:id', async(req, res, next) => {
  let id = parseInt(req.body.id);
  // console.log(req.body, 'return');
  knex('handlers_pets').del().where('id', id).then((ret)=>{
    // console.log(ret, 'delete join');
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
  })

});

router.get('/handlers', function(req, res, next){
  knex('handlers').join('handlers_pets', 'handlers_id', 'handlers.id').join('pets', 'pets_id', 'pets.id').then((ret)=>{
    let join = ret;
    // console.log(join.length, 'handlers join');
    // console.log(join[0].handlers_id, 'id');
    // console.log(join[0].pets.name);
    let handlers
    knex('handlers').then((reta) =>{
      handlers = reta;
      // console.log(handlers, 'handlers');
      res.render('pages/handlers', {
        handlers: handlers,
        join: join
      })
    })
  })
})

router.post('/handler_add', async(req, res, next) => {
  // get array of pet names
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let email = req.body.email;
  let permission = req.body.permission;
  let petsIDS = [];
  // console.log(first_name, last_name, email, permission, 'vars');
  let petsArray = (req.body.pets).split(',');
  for (let x = 0; x < petsArray.length; x++){
    petsArray[x] = petsArray[x].trim();
  }
  // console.log(petsArray, 'pets array');
  // add handler to handlers
  knex('handlers').insert({
    first_name: first_name,
    last_name: last_name,
    email: email,
    permission: permission
  }).then(()=>{
    // console.log('here');
    knex('handlers').where('email', email).then((newHandlerFromDB)=>{
      // console.log(newHandlerFromDB);
      let id = newHandlerFromDB[0].id;
      // console.log(id, 'id');
      let retrievePetIds = new Promise((resolve, reject) => {
        // make array of pet ids
        for (let x = 0; x < petsArray.length; x++){
          knex('pets').where('pets.name', petsArray[x]).then((ret)=>{
            // console.log(ret, 'return');
            //  console.log(ret[0].id, 'by pet name');
            petsIDS.push(ret[0].id);
            if (x === (petsArray.length - 1)){
              resolve(petsIDS);
            }
          })
          // console.log(petsIDS, 'pet ids');
        }
      });

      retrievePetIds.then((arrPetIds)=>{
        let handlers
        let join
        // console.log(petsIDS, id, 'pets ids and id');
        let insertJoin = new Promise((resolve, reject) => {
          for (let x = 0; x < petsIDS.length; x++){
            knex('handlers_pets').insert({
              handlers_id: id,
              pets_id: petsIDS[x]
            }).then((ret)=>{
              console.log(x, 'got here 3');
              console.log((petsIDS.length -1), 'pidl-1');
              if(x === (petsIDS.length -1)){
                console.log('got here 4');
                resolve('done');
                // SEEMS TO BE A bug w/2 pet names
              }
              // console.log(ret, 'each new join');
            });
            // KNEX NOT FINISHING BEFORE PROMISE FINISHES ,, NEED TO REORG SO
          }

        });
        console.log('got here 1');
        insertJoin.then(()=>{
          console.log('got here 2');
          knex('handlers').join('handlers_pets', 'handlers_id', 'handlers.id').join('pets', 'pets_id', 'pets.id').then((ret)=>{
            console.log(ret[0].email, 'return of mass join');
            join = ret;
            console.log(join[0].email, 'join');
            knex('handlers').then((reta) =>{
              handlers = reta;
              res.render('pages/handlers', {
                handlers: handlers,
                join: join
              });
            });
          });
        })

      });

    });

  });
});

// pets not rendering on edit first time, needs refresh FOR BOTH ADD AND EDIT
router.put('/handler_edit/:id', async(req, res, next) => {
  let petsIDS = [];
  let petsArray = (req.body.pets).split(',');
  for (let x = 0; x < petsArray.length; x++){
    petsArray[x] = petsArray[x].trim();
  }
  let id = parseInt(req.params.id);
  knex('handlers').where('id', id).update({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    permission: req.body.permission
  }, '*').then((ret) =>{
    knex('handlers_pets').del().where('handlers_id', id).then((ret)=>{
      let retrievePetIds = new Promise((resolve, reject) => {
        // make array of pet ids
        for (let x = 0; x < petsArray.length; x++){
          knex('pets').where('pets.name', petsArray[x]).then((ret)=>{
            // console.log(ret[0].id, 'by pet name');
            if (ret[0]) {petsIDS.push(ret[0].id)};
            if (x === (petsArray.length - 1)){
              resolve(petsIDS);
            }
          })
        }
      });

      retrievePetIds.then((ret)=>{
// NEED TO DELETE OLD PETS LIST
        let insertPetIDS = new Promise((resolve, reject)=>{
          // console.log(petsIDS, 'to insert');
          for(let x = 0; x < petsIDS.length; x++){
            console.log(id, petsIDS, 'id and petsIDS');
            knex('handlers_pets').insert({
              handlers_id: id,
              pets_id: petsIDS[x]
            }).then((ret)=>{
              console.log(ret, 'inserted objs');
              if(x === (petsIDS.length -1)){
                resolve('done');
              }
            })
          }
        })

        insertPetIDS.then((ret)=>{
          let join
          let handlers
          knex('handlers').join('handlers_pets', 'handlers_id', 'handlers.id').join('pets', 'pets_id', 'pets.id').then((ret)=>{
            // console.log(ret, 'return of mass join');
            join = ret;
            // console.log(join, 'join');
            knex('handlers').then((reta) =>{
              handlers = reta;
              res.render('pages/handlers', {
                handlers: handlers,
                join: join
              });
            });
          });
        })
      })
    })
  });
});

router.delete('/handler_delete/:id', async(req, res, next) => {
  let id = parseInt(req.body.id);
  // console.log(req.body, 'return');
  knex('handlers_pets').del().where('handlers_id', id);
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
