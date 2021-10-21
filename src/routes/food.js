'use strict';

const { foods } = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  let newFood = await foods.create({
    name: req.body.name,
    type: req.body.type || 'unknown',
  });
  res.json(newFood);
});

router.get('/', async (req, res) => {
  let foodData = await foods.findAll();
  res.json(foodData);
});

router.get('/:id', async (req, res) => {
  let foodData = await foods.findOne({ where: { id: req.params.id } });
  res.json(foodData);
});

router.put('/:id', async (req, res) => {
  let foodData = await foods.findOne({ where: { id: req.params.id } });
  if (req.body.name) {
    foodData.name = req.body.name;
  }
  if (req.body.type) {
    foodData.type = req.body.type;
  }
  let savedFood = await foodData.save();
  res.json(savedFood);
});

router.delete('/:id', async (req, res) => {
  let deletedFood = await foods.destroy({ where: { id: req.params.id } });
  res.json(deletedFood);
});

module.exports = router;