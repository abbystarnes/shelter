process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');


xdescribe('GET /pets', () => {
    it('responds with 200', done => {
        request(app)
            .get('/pets')
            .expect(200, done);
    });
});

xdescribe('GET /pets/:id', () => {
  it('responds with 200', done => {
      request(app)
          .get('/pets/2')
          .expect(200, done);
  });
});

describe('POST /pet_add', () => {

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
  it('responds with 200', done => {
      request(app)
          .get('/pets/2')
          .expect(200, done);
  });

});

// xdescribe('PUT /pet/:id', () => {
//
// });

xdescribe('DELETE /sloths/:id', () => {
});
