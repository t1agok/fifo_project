const express = require("express");
const Stock = require('../models/stock');

// Middleware function to get a stock item by ID
async function getStock(req, res, next) {
    let stock;
    try {
        // Attempt to find the stock item by ID
        stock = await Stock.findById(req.params.id);
        if (stock == null) {
            // If the stock item is not found, return a 404 status
            return res.status(404).json({ message: 'Cannot find stock' });
        }
    } catch (err) {
        // If there is an error during retrieval, return a 500 status
        return res.status(500).json({ message: err.message });
    }

    // Attach the stock item to the response object
    res.stock = stock;
    // Pass control to the next middleware function or route handler
    next();
}

module.exports = { getStock };