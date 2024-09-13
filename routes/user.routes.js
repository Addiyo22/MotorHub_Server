
const router = require("express").Router();

// const mongoose = require("mongoose");

const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Orders = require('../models/Orders.model')


router.get("/car", (req, res, next) => {
    Car.find()
      .then((cars) => {
        res.status(200).json(cars);  
      })
      .catch((err) => {
        res.status(500).json({ message: "Error fetching cars", error: err });
      });
  });

module.exports = router;
