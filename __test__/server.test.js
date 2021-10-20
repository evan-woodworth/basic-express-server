'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const { expect, it } = require('@jest/globals');

const request = supertest(server.app);

describe('Testing my Basic Express Server', () => {

  it('Should be able to output the name as a json object', async () => {

    let param = { name: 'Sam' };

    let response = await request.get('/person').send(param);
    // console.log(response);
    expect(response.text).toBe(`{\"name\":\"Sam\"}`);

  });

});