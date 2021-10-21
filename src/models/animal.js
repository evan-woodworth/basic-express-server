'use strict';

const Animal = (sequelize, DataTypes) => sequelize.define('Animal', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Animal;