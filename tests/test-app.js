process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');
const cheerio = require('cheerio');


describe('get /logout', () => {
    it('responds with 200', done => {
        request(app)
            .get('/logout')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });

    // it('returns user to home page', function(done){
    //   var spay = sinon.spy
    // })
});

describe('post /login_gmail', function() {
    it('responds with 404', function() {
        request(app)
            .post('/login_gmail')
            .expect('Content-Type', /text/)
            .expect(404);
    });
});

describe('post /login_local', function(){
    var newLogin = [
      {
        email: 'ek_dai@progressenergyinc.info',
        pwd: '1234'
      }
    ]
    it('responds with 302', function(){
        request(app)
            .post('/login_local')
            .send(newLogin)
            .expect('Content-Type', /text/)
            .expect(302);
    });
});


describe('get /', () => {
    it('responds with 200', done => {
        request(app)
            .get('/')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });
});


describe('GET /pets', () => {
    it('responds with 200', done => {
        request(app)
            .get('/pets')
            .expect('Content-Type', /text/)
            .expect(200, done);
    });
});

describe('GET /pets/:id', () => {
  it('responds with 200', function() {
      request(app)
          .get('/pets/2')
          .expect('Content-Type', /text/)
          .expect(200);
  });
});

describe('GET /pets_add', () => {
  // var newPet = {
  //   pet: {
  //     status: 'Available',
  //     age: 'Adult',
  //     size: 'L',
  //     breed: 'Miniature Pinscher',
  //     name: 'Bonny',
  //     sex: 'F',
  //     description: 'The Miniature Pinscher is a small breed of dog originating from America. The breed\'s earliest ancestors may have included the German Pinscher mixed with Italian greyhounds and dachshunds.',
  //     petID: '248328',
  //     type: 'Dog',
  //     photo: 'https://www.dogbreedinfo.com/images12/MinPinTwiggyPark1.JPG'
  //   }
  // }
  it('responds with 200', function() {
      request(app)
          .get('/pet_add')
          .expect('Content-Type', /text/)
          .expect(200);
  });
});

describe('PUT /pet_edit/:id', function() {

  it('responds with 200', function() {
      request(app)
          .put('/pet_edit/2')
          .expect('Content-Type', /text/)
          .expect(200);
  });

});

describe('DELETE /pet_delete/:id', function() {

  it('responds with 200', function() {
      request(app)
          .delete('/pet_delete/:id')
          .expect('Content-Type', /text/)
          .expect(200);
  });
});

describe('GET /handlers', () => {

  it('responds with 200', done => {
      request(app)
          .get('/handlers')
          .expect('Content-Type', /text/)
          .expect(200, done);
  });

});

describe('POST /handler_add', function() {

  it('responds with 200', function() {
      request(app)
          .post('/handler_add')
          .expect('Content-Type', /text/)
          .expect(200);
  });

});

describe('PUT /handler_edit/:id', function() {

  it('responds with 200', function() {
      request(app)
          .put('/handler_edit/:id')
          .expect('Content-Type', /text/)
          .expect(200);
  });

});

describe('DELETE /handler_delete/:id', function() {

  it('responds with 200', function() {
      request(app)
          .delete('/handler_delete/:id')
          .expect('Content-Type', /text/)
          .expect(200);
  });

});
