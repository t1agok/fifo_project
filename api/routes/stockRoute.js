const express = require('express');
const { Stock } = require('../models');
const router = express.Router();

// Get all stock items
router.get('/stockRoute', async (req, res, next) => {
    try {
        const stocks = await Stock.findAll();
        res.json(stocks);
    } catch (error) {
        next(error);
    }
});

router.get('/stockRoute/:id', async (req, res, next) => {
    try {
      const stock = await Stock.findByPk(req.params.id);
      res.json(stock);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;