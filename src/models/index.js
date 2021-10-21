'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const FoodModel = require('./food.js');
const AnimalModel = require('./animal.js');

let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelizeInstance = new Sequelize(DATABASE_URL, options);

const FoodTable = FoodModel(sequelizeInstance, DataTypes);
const AnimalTable = AnimalModel(sequelizeInstance, DataTypes);

module.exports = {
  db: sequelizeInstance,
  foods: FoodTable,
  animals: AnimalTable,
};