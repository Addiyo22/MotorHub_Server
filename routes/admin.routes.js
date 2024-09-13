
const router = require("express").Router();
const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Order = require("../models/Orders.model");
const Inventory = require("../models/Inventory.model");
const { isAuthenticated } = require("../middlesware/jwt.middleware");

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
        const newCar = new Car(req.body.carDetails);
        const savedCar = await newCar.save();
        const newInventory = new Inventory({
            car: savedCar._id,                  
            quantity: req.body.inventoryDetails.quantity,  
            location: req.body.inventoryDetails.location
        })
        const savedInventory = await newInventory.save();
    
    res.status(201).json({ 
        message: 'Car and inventory added successfully',
        car: savedCar,
        inventory: savedInventory
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
        res.status(200).json(car, reviews);
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
        const deletedInventory = await Inventory.findOneAndDelete({ car: carId });
        res.status(200).json({
            message: "Car and associated inventory deleted successfully",
            car: deletedCar,
            inventory: deletedInventory
          });
    } catch (error) {
        console.error(error)
    }
    
});

// ====>>>>Orders

router.get('/admin/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('car');
        res.status(200).json(orders);
    } catch (error) {
        console.error(error)
    }
    
});

router.put('/admin/orders/:orderId', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
        res.status(200).json(updatedOrder);
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

router.get('/inventory/:carId', async (req, res) => {
    try {
      const carInventory = await Inventory.findOne({ car: req.params.carId }).populate('car');
      res.status(200).json(carInventory);
    } catch (error) {
        console.error(error)
    }
  });

  router.put('/admin/inventory/:inventoryId', async (req, res) => {
    try {
      const updatedInventory = await Inventory.findByIdAndUpdate(
        req.params.inventoryId,
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

  
  router.post('/cars/:carId/review', async (req, res) => {
    try {
      const { carId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user._id;
  
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
      const userId = req.user._id; 

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