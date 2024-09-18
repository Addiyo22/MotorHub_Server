
const router = require("express").Router();

// const mongoose = require("mongoose");

const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Order = require('../models/Orders.model')
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
        res.status(200).json({car, reviews});
    } catch (error) {
        console.error(error)
    }
    
})

  // ===>>> Configurations

  router.post('/cars/:carId/configure', isAuthenticated, async (req, res) => {
    try {
      const { carId } = req.params;
      const { engine, transmission, exteriorColor, interiorColor, features, price } = req.body;
      const userId = req.payload._id;   
      const car = await Car.findById(carId);
      car.engine = engine || car.engine;
      car.transmission = transmission || car.transmission;
      car.interiorColor = interiorColor || car.interiorColor;
      car.exteriorColor = exteriorColor || car.exteriorColor;
      car.features = features || car.features;
      car.price = price || car.price;
  
      const updatedCar = await car.save();

      const user = await User.findById(userId);
      user.savedConfigurations.push({
        car: car._id,
        engine,
        transmission,
        interiorColor,
        exteriorColor,
        features,
        price
      });
  
      await user.save();  
      res.status(200).json({
        message: 'Car configured successfully and saved to user profile',
        car: updatedCar,
        userConfigurations: user.savedConfigurations
      });
    } catch (err) {
      console.error(err);
    }
  });

  router.get('/user/configurations', async (req, res) => {
    try {
      const userId = req.payload._id; 
  
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

  router.post('/user/:configurationId/order',isAuthenticated, async (req, res) => {
    try {
      const { configurationId } = req.params;
      const userId = req.payload._id;  

      const user = await User.findById(userId).populate('savedConfigurations.car');
      const configuration = user.savedConfigurations.find(config => {
        return config._id.equals(configurationId);  
});
      console.log('Configuration found:', configuration);
      if (!configuration) {
        return res.status(404).json({ message: 'Configuration not found for this user' });
      }
      const totalPrice = configuration.price + 500
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
      const cars = await Car.find({ available: true });
        res.status(202).json(cars)
    } catch (error) {
        console.error(error)
    }

  })

  router.get('/inventory/:carId', async (req, res) => {
    try {
      const carInventory = await Car.findById(req.params.carId )
      console.log('Requested carId:', carInventory);
      if (!carInventory) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.status(200).json(carInventory);
    } catch (error) {
        console.error(error)
    }
  });

module.exports = router;
