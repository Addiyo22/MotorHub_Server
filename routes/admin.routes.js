
const router = require("express").Router();
const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Order = require("../models/Orders.model");
const { isAuthenticated } = require("../middlesware/jwt.middleware");

//===>>> Admin Information

router.get('/admin/profile', isAuthenticated, async (req, res) => {
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

// ====>>>>cars

router.get('/cars', async (req, res) => {
    try {
        const cars = await Car.find();
    res.status(200).json(cars);
    } catch (error) {
        console.error(error)
    }
    
});

router.post('/admin/newCar', async (req, res) => {
    try{
        const newCar = new Car(req.body);
        const savedCar = await newCar.save();
        console.log(req.body)
    res.status(201).json({ 
        message: 'Car added successfully',
        car: savedCar
    });
    }
    catch(error){
        console.error(error)
    }
});

router.get('/admin/cars/:carId', async (req,res) => {
    try {
        const { carId } = req.params;
        const car = await Car.findById(carId);
        const reviews = await Review.find({ car: carId }).populate('user', 'name');
        res.status(200).json({car, reviews});
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/admin/cars/:carId', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        console.error(error)
    }
    
});

router.delete('/admin/cars/:carId', async (req, res) => {
    try {
        const { carId } = req.params;
        const deletedCar = await Car.findByIdAndDelete(carId);
        res.status(200).json({
            message: "Car and associated inventory deleted successfully",
            car: deletedCar
          });
    } catch (error) {
        console.error(error)
    }
    
});

// ====>>>>Orders

router.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error)
    }
    
});

router.put('/admin/orders/:orderId', async (req, res) => {
    try {
        const {orderId} = req.params
        const {status} = req.body

        const updatedOrder = await Order.findByIdAndUpdate(orderId, {status}, { new: true });
        res.status(200).json({ message: `Order ${status}`,updatedOrder});
    } catch (error) {
        console.error(error)
    }
    
});

router.delete('/admin/orders/:orderId', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.orderId)
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error(error)
    }
})

// ===>>> Users

router.get('/admin/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error)
    }
    
});

router.get('/admin/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
    }
    
});

router.delete('/admin/users/:userId/delete', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
    }
    
});

// ===>>> Inventory

router.get('/inventory/:carId',isAuthenticated, async (req, res) => {
    try {
      const carInventory = await Car.find({ available: true })
      res.status(200).json(carInventory);
    } catch (error) {
        console.error(error)
    }
  });

  router.put('/admin/inventory/:carId', async (req, res) => {
    try {
      const updatedInventory = await Car.findByIdAndUpdate(
        req.params.carId,
        req.body, 
        { new: true }
      );
      res.status(200).json({ message: 'Inventory updated successfully', inventory: updatedInventory });
    } 
    catch (error) {
        console.error(error)
    }
  });

  //===>>> Reviews

  
  router.post('/cars/:carId/review',isAuthenticated, async (req, res) => {
    try {
      const { carId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.payload._id;
  
      const car = await Car.findById(carId);
      const newReview = new Review({
        user: userId,
        car: carId,
        rating,
        comment
      });
  
      const savedReview = await newReview.save();
      res.status(201).json({ message: 'Review added successfully', review: savedReview });
    } catch (error) {
      console.error(error);
    }
  });


  router.delete('/cars/:carId/review/:reviewId', isAuthenticated, async (req, res) => {
    try {
      const { carId, reviewId } = req.params;
      const userId = req.payload._id; 

      const review = await Review.findOne({ _id: reviewId, car: carId });

      if (review.user.toString() !== userId.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: 'You are not authorized to delete this review' });
      }

      await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
    }
  });
  




module.exports = router;