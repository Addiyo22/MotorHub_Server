const express = require('express');
const router = express.Router();
const Car = require('../models/Car.model');

router.get('/cars/images', async (req, res) => {
  try {
    const cars = await Car.find({}, 'images');
    
    res.status(200).json(cars);
  } catch (error) {
    console.error('Error fetching car images:', error);
    res.status(500).json({ message: 'Failed to fetch car images. Please try again later.' });
  }
});

module.exports = router;