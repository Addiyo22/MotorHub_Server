
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


router.get("/cars", async (req, res, next) => {
    try{
        const cars = await Car.find({ quantity: { $exists: false } });
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

  router.get('/user/configurations', isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id; 
  
      const user = await User.findById(userId).populate('savedConfigurations.car');
  
      if (!user || user.savedConfigurations.length === 0) {
        return res.status(404).json({ message: 'No configurations found for this user' });
      }

      const availableConfigurations = user.savedConfigurations.filter(
        (config) => !config.isOrdered
      );
  
      res.status(200).json(availableConfigurations);
    } catch (error) {
      console.error(error);
    }
  });

  router.delete('/user/configurations/:configurationId', isAuthenticated, async (req, res) => {
    const userId = req.payload._id;
    const { configurationId } = req.params;
    try {
      await User.findByIdAndUpdate(userId, {
        $pull: { savedConfigurations: { _id: configurationId } },
      });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error)
    }
})


  ///===>>>> Orders

  router.post('/user/:configurationId/order',isAuthenticated, async (req, res) => {
    try {
      const { configurationId } = req.params;
      const userId = req.payload._id;  

      const user = await User.findById(userId).populate('savedConfigurations.car');
      const configuration = user.savedConfigurations.find(config => {
        return config._id.equals(configurationId);  
      });
      if (!configuration) {
        return res.status(404).json({ message: 'Configuration not found for this user' });
      }

      const car = configuration.car
      if (car.quantity !== undefined && typeof car.quantity === 'number') {
        if (car.quantity < 1) {
          return res.status(400).json({ message: 'Car is out of stock.' });
        }
      }

      configuration.isOrdered = true;
      await user.save()

      const totalPrice = configuration.price + 500
      const newOrder = new Order({
        user: userId,
        configurationId: configurationId,
        totalPrice,
        status: 'Pending'
      });
      
      const savedOrder = await newOrder.save();

      if (car.quantity !== undefined && typeof car.quantity === 'number') {
        car.quantity -= 1;
        await car.save();
      }
      res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
      console.error(error);
    }
  });

  router.get('/user/:userId/orders', isAuthenticated, async (req, res) => {
    try {
      const userId = req.payload._id; // Ensure req.payload is correctly set by the middleware
  
      // Fetch orders for the user
      const orders = await Order.find({ user: userId });
  
      // Fetch the user with saved configurations
      const user = await User.findById(userId).populate('savedConfigurations.car');
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user' });
      }
  
      // Attach configurations from the user model to the order data
      const ordersWithConfigurations = orders.map((order) => {
        // Find the configuration in the user's savedConfigurations
        const configuration = user.savedConfigurations.find((config) =>
          config._id.equals(order.configurationId)
        );
  
        // Debugging: Log when configuration or car is not found
        if (!configuration) {
          console.log(
            `Configuration with ID ${order.configurationId} not found for user ${userId}`
          );
        } else if (!configuration.car) {
          console.log(
            `Car details not found for configuration ID ${configuration._id}`
          );
        }
  
        // Attach the configuration to the order object
        return { ...order._doc, configuration: configuration || null };
      });
  
      // Log the processed orders to help with debugging
      console.log('Processed Orders with Configurations:', ordersWithConfigurations);
      res.status(200).json(ordersWithConfigurations);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Internal server error. Please try again later.' });
    }
  });
  

  // Inventory

  router.get('/inventory', async (req, res) => {
    try {
      const cars = await Car.find({ quantity: { $exists: true }});
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


  /// reviews

  router.post('/cars/:carId/reviews', isAuthenticated, async (req, res) => {
    const { carId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.payload._id; 
  
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }
  
    try {
      const existingReview = await Review.findOne({ user: userId, car: carId });
      if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this car.' });
      }
  
      const newReview = new Review({
        user: userId,
        car: carId,
        rating,
        comment,
      });
  
      const savedReview = await newReview.save();
  
      res.status(201).json({
        message: 'Review created successfully',
        review: savedReview,
      });
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ message: 'Failed to create review. Please try again later.' });
    }
  });

  router.get('/cars/:carId/reviews', async (req, res) => {
    const { carId } = req.params;
  
    try {
      const reviews = await Review.find({ car: carId })
        .populate('user', 'username name') 
        .populate('car', 'make model year'); 
  
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ message: 'Failed to fetch reviews. Please try again later.' });
    }
  });

  router.delete('/reviews/:reviewId', isAuthenticated, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.payload._id;
  
    try {
      const review = await Review.findById(reviewId).populate('user');
  
      if (review.user._id.toString() !== userId && !req.payload.isAdmin) {
        return res.status(403).json({ message: 'You do not have permission to delete this review.' });
      }
  
      await review.remove();
      res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ message: 'Failed to delete the review. Please try again later.' });
    }
  });

module.exports = router;
