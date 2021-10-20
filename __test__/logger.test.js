'use strict';

const logger = require('../src/middleware/logger.js');
const supertest = require('supertest');
const server = require('../src/server.js');

const request = supertest(server.app);

describe('Testing my logger', () => {

  let req = {
    method: 'GET',
    path: '/person',
  };
  let res = {};
  let next = jest.fn();
  console.log = jest.fn();

  it('Should be able to log the method and path', () => {

    logger(req, res, next);

    expect(console.log).toHaveBeenCalledWith('Method: GET, Path: /person');
    expect(next).toHaveBeenCalled();

  });

  it('Should throw an error when a different method is called', async () => {

    const response = await request.post('/person');

    expect(console.log).toHaveBeenCalledWith('Method: POST, Path: /person');
    expect(response.status).toBe(404);

  });

  it('Should throw an error when a different path is taken', async () => {

    const response = await request.get('/somethingelse');

    expect(console.log).toHaveBeenCalledWith('Method: GET, Path: /somethingelse');
    expect(response.status).toBe(404);

  });

});