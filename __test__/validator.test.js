'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');

const request = supertest(server.app);

describe('Testing my Validator', () => {

  it('Should respond with a status of 200 if the name is in the query string', async () => {

    let param = { name: 'Sam' };

    let response = await request.get('/person').send(param);

    expect(response.status).toBe(200);
    
  });

  it('Should throw an error with a status of 500 if the name is not in the query string', async () => {

    let response = await request.get('/person');

    expect(response.status).toBe(500);

  });

});