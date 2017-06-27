process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');


describe('GET /pets', () => {
    it('responds with 200', done => {
        request(app)
            .get('/pets')
            .expect(200, done);
    });
});

xdescribe('GET /sloths/:id', () => {
});

xdescribe('POST /sloths', () => {
});

xdescribe('PUT /sloths/:id', () => {
});

xdescribe('DELETE /sloths/:id', () => {
});
