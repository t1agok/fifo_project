const express = require('express');
const { Operation } = require('../models');
const router = express.Router();

router.post('/operationRoute', async (req, res, next) => {
  try {
    const operation = await Operation.create(req.body);
    res.json(operation);
  } catch (error) {
    next(error);
  }
});

router.get('/operationRoute', async (req, res, next) => {
  try {
    const operations = await Operation.findAll();
    res.json(operations);
  } catch (error) {
    next(error);
  }
});

router.get('/operationRoute/:id', async (req, res, next) => {
  try {
    const operation = await Operation.findByPk(req.params.id);
    res.json(operation);
  } catch (error) {
    next(error);
  }
});

router.put('/operationRoute/:id', async (req, res, next) => {
  try {
    await Operation.update(req.body, { where: { operation_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

router.delete('/operationRoute/:id', async (req, res, next) => {
  try {
    await Operation.destroy({ where: { operation_id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
