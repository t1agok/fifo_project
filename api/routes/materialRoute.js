const express = require('express');
const { Material } = require('../models');
const router = express.Router();

router.post('/materialRoute', async (req, res, next) => {
  try {
    const material = Material.create(req.body);
    res.json(material);
  } catch (error) {
    next(error);
  } 
});

router.get('/materialRoute', async (req, res, next) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    next(error);
  }
});

router.get('/materialRoute/:id', async (req, res, next) => {
  try {
    const material = await Material.findByPk(req.params.id);
    res.json(material);
  } catch (error) {
    next(error);
  }
});

router.put('/materialRoute/:id', async (req, res, next) => {
  try {
    await Material.update(req.body, { where: { material_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/materialRoute/:id', async (req, res, next) => {
  try {
    await Material.destroy({ where: { material_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
