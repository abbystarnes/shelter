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
  let newToken = { id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjAwOTM1MGMwZDNkYmMzNzhlZTFkYWYzN2RkZjdmN2RiZDcyOGEyMjIifQ.eyJhenAiOiI0NjM5NjEyNDIzMC01bW9qaDVpYzU2OTB0M2ZhMTlkYnY1MDVwNHU1MmxjMi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjQ2Mzk2MTI0MjMwLTVtb2poNWljNTY5MHQzZmExOWRidjUwNXA0dTUybGMyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE4MDU4NjI2ODYzMDQyODg5NzAyIiwiZW1haWwiOiJvcmRldHRlc3Rhcm5lc0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IlZEOUpxQko4TVBHZjVOLS1YR2NYcGciLCJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiaWF0IjoxNDk4ODM5NjM0LCJleHAiOjE0OTg4NDMyMzQsIm5hbWUiOiJBYmJ5IFN0YXJuZXMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy16ckdpWGljS3AwQS9BQUFBQUFBQUFBSS9BQUFBQUFBQUFrMC96cl9yWmhNZ0FzTS9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiQWJieSIsImZhbWlseV9uYW1lIjoiU3Rhcm5lcyIsImxvY2FsZSI6ImVuIn0.MFTDx4JUafhNstK5fh5bQSfY-bkOOQqxfwObsN7EfoP-arPvzHyFBft5U5Re9TIfV8eg_vHD2PNVicd14XE8VdrniN7KADW2jlsB-ovlC0Gm-Bg23IZNJJeuUtnw2yCvAloP9nFQcPqxdx6f1sSKIUrYfdqS3WU9YPAGADHrB9UOg7th2rgEr-LTRcrSMNvb7CugQfRaAHeVbWTjYanX4TIjGAMbahcPYlEf9kNcHRiL2fVL7l_h8HLg3t9JxJlakK4MEhTkfassxP-22MuI2iqpiMOrHv0KB1oAVFixiIY7ASD1g7DQCq_xrHc5vUF7bDZKd-nkbDUkJWIJzHt6og',
  email: 'ordettestarnes@gmail.com' }

    it('responds with 400', function(done) {
        request(app)
            .post('/login_gmail')
            .send(newToken)
            .expect('Content-Type', /text/)
            .expect(400, done);
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
