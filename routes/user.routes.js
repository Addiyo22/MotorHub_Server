
const router = require("express").Router();

// const mongoose = require("mongoose");

const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Orders = require('../models/Orders.model')
const Inventory = require('../models/Inventory.model')
const Configuration = require('../models/Configuration.model')
const {isAuthenticated} = require('../middlesware/jwt.middleware')

//===>>> User Information

router.get('/user/profile', isAuthenticated, async (req, res) => {
    try {
      const userId = req.user._id; 
  
      const user = await User.findById(userId, '-password'); 
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
    }
  });

  //====>>> Car


router.get("/car", async (req, res, next) => {
    try{
        const cars = await Car.find()
        res.status(200).json(cars); 
    }catch(err) {
        console.error(err)
      }
  });

  router.get('/cars/:carId', async (req,res) => {
    try {
        const { carId } = req.params;
        const car = await Car.findById(carId);
        const reviews = await Review.find({ car: carId }).populate('user', 'name');
        res.status(200).json(car, reviews);
    } catch (error) {
        console.error(error)
    }
    
})

  // ===>>> Configurations

  router.post('/cars/:carId/configure', async (req, res) => {
    try {
      const { carId } = req.params;
      const { engine, transmission, color, features, totalPrice } = req.body;
      const userId = req.user._id; 
  
      const newConfig = new Configuration({
        user: userId,
        car: carId,
        engine,
        transmission,
        color,
        features,
        totalPrice
      });
  
      const savedConfig = await newConfig.save();
      res.status(201).json({ message: 'Car configured successfully', configuration: savedConfig });
    } catch (err) {
      console.error(err);
    }
  });

  router.get('/user/configurations', async (req, res) => {
    try {
      const userId = req.user._id; 
  
      const configurations = await Configuration.find({ user: userId }).populate('car');
  
      if (configurations.length === 0) {
        return res.status(404).json({ message: 'No configurations found for this user' });
      }
  
      res.status(200).json(configurations);
    } catch (error) {
      console.error(error);
    }
  });


  ///===>>>> Orders

  router.post('/user/orders', async (req, res) => {
    try {
      const { configurationId, totalPrice } = req.body;
      const userId = req.user._id;  

      const newOrder = new Order({
        user: userId,
        configuration: configurationId,
        totalPrice,
        status: 'Pending'
      });
  
      const savedOrder = await newOrder.save();
      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
      console.error(error);
    }
  });

  // Inventory

  router.get('/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.find()
        res.status(202).json(inventory)
    } catch (error) {
        console.error(error)
    }

  })

  router.get('/inventory/:carId', async (req, res) => {
    try {
      const carInventory = await Inventory.findOne({ car: req.params.carId }).populate('car');
      res.status(200).json(carInventory);
    } catch (error) {
        console.error(error)
    }
  });

module.exports = router;
