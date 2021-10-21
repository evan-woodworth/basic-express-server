'use strict';

const { animals } = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    let newAnimal = await animals.create({
      name: req.body.name,
      species: req.body.species || 'unknown',
    });
    res.json(newAnimal);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.get('/', async (req, res) => {
  try {
    let animalData = await animals.findAll();
    res.json(animalData);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id', async (req, res) => {
  try {
    let animalData = await animals.findOne({ where: { id: req.params.id } });
    res.json(animalData);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

router.put('/:id', async (req, res) => {
  try {
    let animalData = await animals.findOne({ where: { id: req.params.id } });
    if (req.body.name) {
      animalData.name = req.body.name;
    }
    if (req.body.species) {
      animalData.species = req.body.species;
    }
    let savedAnimal = await animalData.save();
    res.json(savedAnimal);
  } catch(e) {
    console.error(e);
    next(e);
  }

});

router.delete('/:id', async (req, res) => {
  try {
    let deletedAnimal = await animals.destroy({ where: { id: req.params.id } });
    res.json(deletedAnimal);
  } catch(e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;