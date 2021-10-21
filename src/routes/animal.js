'use strict';

const { animals } = require('../models');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  console.log(req.body);
  let newAnimal = await animals.create({
    name: req.body.name,
    species: req.body.species || 'unknown',
  });
  res.json(newAnimal);
});

router.get('/', async (req, res) => {
  let animalData = await animals.findAll();
  res.json(animalData);
});

router.get('/:id', async (req, res) => {
  let animalData = await animals.findOne({ where: { id: req.params.id } });
  res.json(animalData);
});

router.put('/:id', async (req, res) => {
  let animalData = await animals.findOne({ where: { id: req.params.id } });
  if (req.body.name) {
    animalData.name = req.body.name;
  }
  if (req.body.species) {
    animalData.species = req.body.species;
  }
  let savedAnimal = await animalData.save();
  res.json(savedAnimal);
});

router.delete('/:id', async (req, res) => {
  let deletedAnimal = await animals.destroy({ where: { id: req.params.id } });
  res.json(deletedAnimal);
});

module.exports = router;