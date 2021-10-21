'use strict';

const server = require('../src/server.js');
const supertest = require('supertest');
const { expect, it } = require('@jest/globals');
const request = supertest(server.app);
const { db, animals, foods } = require('../src/models');

beforeAll(async () => {
  //makes sure that my tables exist
  await db.sync(); //creates our table if they do not exist
});

afterAll(async () => {
  //drops all of the table rows within our database instance
  await db.drop();
});

describe('Testing my Basic Express Server', () => {

  it('Should be able to output the name as a json object', async () => {

    let param = { name: 'Sam' };

    let response = await request.get('/person').send(param);
    // console.log(response);
    expect(response.text).toBe(`{\"name\":\"Sam\"}`);

  });

});

describe('Testing my food sequelize model', () => {

  it('Should be able to create a food', async () => {

    let newFood = await foods.create({
      name: 'banana',
      type: 'fruit',
    });

    expect(newFood.name).toEqual('banana');
    expect(newFood.type).toEqual('fruit');

  });

});

describe('Testing my animal sequelize model', () => {

  it('Should be able to create an animal', async () => {

    let newAnimal = await animals.create({
      name: 'Sir Gregory',
      species: 'Cat',
    });

    expect(newAnimal.name).toEqual('Sir Gregory');
    expect(newAnimal.species).toEqual('Cat');

  });

});

describe('Testing animal CRUD routes', () => {

  it('Should return a new animal on POST /', async () => {
    
    let param = {
      name: 'Boo Bear',
      species: 'Dog',
    };

    const response = await request.post('/animal').send(param);

    expect(response.text).toContain('Boo Bear');
  });

  it('Should return all animals on GET /', async () => {

    let param = {
      name: 'Foo Bear',
      species: 'Cat',
    };
    const secondAnimal = await request.post('/animal').send(param);

    const response = await request.get('/animal');

    expect(response.text).toContain('Boo Bear');
    expect(response.text).toContain('Foo Bear');
  });

  it('Should return a specific animal on Get /:id', async () => {

    const response = await request.get('/animal/1');

    expect(response.text).toContain('Sir Gregory');
  });

  it('Should return an updated record on PUT /:id', async () => {

    let param = {
      name: 'Foo Bear',
    };

    const response = await request.put('/animal/1').send(param);

    expect(response.text).toContain('Foo Bear');
  });

  it('Should return id of deleted item on DELETE /:id', async () => {

    const response = await request.delete('/animal/1');

    expect(response.text).toContain('1');
  });

});

describe('Testing food CRUD routes', () => {

  it('Should return a new food on POST /', async () => {
    
    let param = {
      name: 'Banana',
      type: 'Fruit',
    };

    const response = await request.post('/food').send(param);

    expect(response.text).toContain('Banana');
  });

  it('Should return all foods on GET /', async () => {

    let param = {
      name: 'Chicken',
      type: 'yummy',
    };
    const secondFood = await request.post('/food').send(param);

    const response = await request.get('/food');

    expect(response.text).toContain('Banana');
    expect(response.text).toContain('Chicken');
  });

  it('Should return a specific food on Get /:id', async () => {

    const response = await request.get('/food/1');

    expect(response.text).toContain('banana');
  });

  it('Should return an updated record on PUT /:id', async () => {

    let param = {
      name: 'Apple',
    };

    const response = await request.put('/food/1').send(param);

    expect(response.text).toContain('Apple');
  });

  it('Should return id of deleted item on DELETE /:id', async () => {

    const response = await request.delete('/food/1');

    expect(response.text).toContain('1');
  });

});