'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const FoodModel = require('./food.js');
const AnimalModel = require('./animal.js');

let DATABASE_URL = process.env.DATABASE_URL;

const sequelizeInstance = new Sequelize(DATABASE_URL);

const FoodTable = FoodModel(sequelizeInstance, DataTypes);
const AnimalTable = AnimalModel(sequelizeInstance, DataTypes);

module.exports = {
  db: sequelizeInstance,
  foods: FoodTable,
  animals: AnimalTable,
};