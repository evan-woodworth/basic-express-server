'use strict';

const { foods } = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let newFood = await foods.create({
      name: req.body.name,
      type: req.body.type || 'unknown',
    });
    res.json(newFood);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.get('/', async (req, res) => {
  try {
    let foodData = await foods.findAll();
    res.json(foodData);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let foodData = await foods.findOne({ where: { id: req.params.id } });
    res.json(foodData);  
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let foodData = await foods.findOne({ where: { id: req.params.id } });
    if (req.body.name) {
      foodData.name = req.body.name;
    }
    if (req.body.type) {
      foodData.type = req.body.type;
    }
    let savedFood = await foodData.save();
    res.json(savedFood);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let deletedFood = await foods.destroy({ where: { id: req.params.id } });
    res.json(deletedFood);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;