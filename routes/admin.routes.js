
const router = require("express").Router();
const User = require("../models/User.model")
const Car = require("../models/Car.model")
const Review = require('../models/Review.model')
const Order = require("../models/Orders.model");
const { isAuthenticated, checkAdmin } = require("../middlesware/jwt.middleware");
const {fileUploader} = require('../config/cloudinary.config');
//===>>> Admin Information

router.get('/admin/profile', isAuthenticated, checkAdmin, async (req, res) => {
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
        const cars = await Car.find({ quantity: { $exists: false } });
        res.status(200).json(cars);
    } catch (error) {
        console.error(error)
    }
});

router.post('/admin/newCar', isAuthenticated, checkAdmin, fileUploader.single('image'), async (req, res) => {
    try {
      // Parse the car details from the request body
      const carDetails = JSON.parse(req.body.carDetails);
  
      // Check if the image was uploaded and get the URL
      const imageUrl = req.file ? req.file.path : ''; // Multer with Cloudinary automatically assigns the path
  
      // Create a new car document with the provided details and uploaded image URL
      const newCar = new Car({
        ...carDetails,
        images: imageUrl ? [imageUrl] : [], // Add the image URL if available
      });
  
      // Save the new car to the database
      await newCar.save();
      res.status(201).json({ message: 'Car created successfully', car: newCar });
    } catch (error) {
      console.error('Error creating car:', error);
      res.status(500).json({ message: 'Failed to create car. Please try again later.' });
    }
  });

router.get('/admin/cars/:carId', isAuthenticated, checkAdmin, async (req,res) => {
    try {
        const { carId } = req.params;
        const car = await Car.findById(carId);
        const reviews = await Review.find({ car: carId }).populate('user', 'name');
        res.status(200).json({car, reviews});
    } catch (error) {
        console.error(error)
    }
})

/* router.put('/admin/cars/:carId/edit', isAuthenticated, checkAdmin, fileUploader.single('image'), async (req, res) => {
    const { carId } = req.params;
  
    // Destructure car details from request body or use defaults if none provided
    const {
      make,
      model,
      year,
      trim,
      engine,
      engineHorsepower,
      transmission,
      interiorColor,
      exteriorColor,
      features,
      price,
      quantity,
      location,
      available,
    } = req.body.carDetails || {};
  
    try {
      // Handle image URL if a new image was uploaded
      const imageUrl = req.file ? req.file.path : undefined;
  
      // Prepare the updated fields, ensuring correct handling of different data types
      const updatedFields = {
        make,
        model: Array.isArray(model) ? model : typeof model === 'string' ? model.split(',').map(m => m.trim()) : undefined,
        year,
        trim: Array.isArray(trim) ? trim : typeof trim === 'string' ? trim.split(',').map(t => t.trim()) : undefined,
        engine: Array.isArray(engine) ? engine : typeof engine === 'string' ? engine.split(',').map(e => e.trim()) : undefined,
        engineHorsepower: Array.isArray(engineHorsepower)
          ? engineHorsepower
          : typeof engineHorsepower === 'string'
          ? engineHorsepower.split(',').map(Number)
          : undefined,
        transmission: Array.isArray(transmission)
          ? transmission
          : typeof transmission === 'string'
          ? transmission.split(',').map(t => t.trim())
          : undefined,
        interiorColor: Array.isArray(interiorColor)
          ? interiorColor
          : typeof interiorColor === 'string'
          ? interiorColor.split(',').map(c => c.trim())
          : undefined,
        exteriorColor: Array.isArray(exteriorColor)
          ? exteriorColor
          : typeof exteriorColor === 'string'
          ? exteriorColor.split(',').map(c => c.trim())
          : undefined,
        features: Array.isArray(features) ? features : typeof features === 'string' ? features.split(',').map(f => f.trim()) : [],
        price,
        quantity,
        location,
        available,
      };
  
      if (imageUrl) {
        updatedFields.images = [imageUrl];
      }
  
      // Update the car document with the new details
      const updatedCar = await Car.findByIdAndUpdate(carId, updatedFields, { new: true, runValidators: true });
  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
      console.log("uopdated car", updatedCar)
      res.status(200).json({
        message: 'Car updated successfully',
        car: updatedCar,
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Failed to update car. Please try again later.' });
    }
  }); */
  
  /* router.put('/admin/cars/:carId/edit', isAuthenticated, checkAdmin, fileUploader.single('image'), async (req, res) => {
    const { carId } = req.params;
  
    // Parse carDetails from the request body
    const {
      make,
      model,
      year,
      trim,
      engine,
      engineHorsepower,
      transmission,
      interiorColor,
      exteriorColor,
      features,
      price,
      quantity,
      location,
      available,
    } = JSON.parse(req.body.carDetails); // Ensure it's parsed correctly from FormData
  
    try {
      // Handle the interior and exterior color parsing (in case they are provided as strings)
      const parsedInteriorColor = interiorColor
        ? typeof interiorColor === 'string'
          ? JSON.parse(interiorColor)
          : interiorColor
        : undefined;
  
      const parsedExteriorColor = exteriorColor
        ? typeof exteriorColor === 'string'
          ? JSON.parse(exteriorColor)
          : exteriorColor
        : undefined;
  
      // Prepare updated fields, ensuring undefined fields are not accidentally overwritten
      const updatedFields = {
        make,
        model: model ? model.split(',').map((m) => m.trim()) : undefined,
        year,
        trim: trim ? trim.split(',').map((t) => t.trim()) : undefined,
        engine: engine ? engine.split(',').map((e) => e.trim()) : undefined,
        engineHorsepower: engineHorsepower ? engineHorsepower.split(',').map(Number) : undefined,
        transmission: transmission ? transmission.split(',').map((t) => t.trim()) : undefined,
        interiorColor: parsedInteriorColor ? [parsedInteriorColor] : undefined, // Keep it as an array with name & hex
        exteriorColor: parsedExteriorColor ? [parsedExteriorColor] : undefined, // Same for exterior color
        features: features ? features.split(',').map((f) => f.trim()) : undefined,
        price,
        quantity,
        location,
        available,
      };
  
      // Handle image upload
      if (req.file) {
        updatedFields.image = req.file.path; // Store the uploaded image path in the car document
      }
  
      // Remove undefined values from the update payload
      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key] === undefined) {
          delete updatedFields[key];
        }
      });
  
      // Find and update the car
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        updatedFields,
        { new: true, runValidators: true } // Return the updated document and run validators
      );
  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car updated successfully',
        car: updatedCar,
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Failed to update car. Please try again later.' });
    }
  }); */

  /* router.put('/admin/cars/:carId/edit', isAuthenticated, checkAdmin, fileUploader.single('image'), async (req, res) => {
    const { carId } = req.params;
  
    // Parse carDetails from the request body
    const {
      make,
      model,
      year,
      trim,
      engine,
      engineHorsepower,
      transmission,
      interiorColor,
      exteriorColor,
      features,
      price,
      quantity,
      location,
      available,
    } = JSON.parse(req.body.carDetails); // Ensure it's parsed correctly from FormData
  
    try {
      // Handle the interior and exterior color parsing (in case they are provided as strings)
      const parsedInteriorColor = interiorColor
        ? typeof interiorColor === 'string'
          ? JSON.parse(interiorColor)
          : interiorColor
        : undefined;
  
      const parsedExteriorColor = exteriorColor
        ? typeof exteriorColor === 'string'
          ? JSON.parse(exteriorColor)
          : exteriorColor
        : undefined;
  
      // Prepare updated fields, ensuring undefined fields are not accidentally overwritten
      const updatedFields = {
        make,
        model: Array.isArray(model) ? model : model.split(',').map((m) => m.trim()), // Check if model is already an array
        year,
        trim: Array.isArray(trim) ? trim : trim.split(',').map((t) => t.trim()), // Check if trim is already an array
        engine: Array.isArray(engine) ? engine : engine.split(',').map((e) => e.trim()), // Check if engine is already an array
        engineHorsepower: Array.isArray(engineHorsepower) ? engineHorsepower : engineHorsepower.split(',').map(Number), // Check if it's already an array
        transmission: Array.isArray(transmission) ? transmission : transmission.split(',').map((t) => t.trim()), // Check if transmission is already an array
        interiorColor: parsedInteriorColor ? [parsedInteriorColor] : undefined, // Ensure color fields are arrays of objects
        exteriorColor: parsedExteriorColor ? [parsedExteriorColor] : undefined,
        features: Array.isArray(features) ? features : features.split(',').map((f) => f.trim()), // Ensure features is an array
        price,
        quantity,
        location,
        available,
      };
  
      // Handle image upload
      if (req.file) {
        updatedFields.image = req.file.path; // Store the uploaded image path in the car document
      }
  
      // Remove undefined values from the update payload
      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key] === undefined) {
          delete updatedFields[key];
        }
      });
  
      // Find and update the car
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        updatedFields,
        { new: true, runValidators: true } // Return the updated document and run validators
      );
  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car updated successfully',
        car: updatedCar,
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Failed to update car. Please try again later.' });
    }
  }); */

  router.put('/admin/cars/:carId/edit', isAuthenticated, checkAdmin, fileUploader.single('image'), async (req, res) => {
    const { carId } = req.params;
  
    // Parse carDetails from the request body
    const {
      make,
      model,
      year,
      trim,
      engine,
      engineHorsepower,
      transmission,
      interiorColor,
      exteriorColor,
      features,
      price,
      quantity,
      location,
      available,
    } = JSON.parse(req.body.carDetails);
  
    try {
        const imageUrl = req.file ? req.file.path : undefined;
      // Handle the interior and exterior color parsing (ensure it's valid JSON or undefined)
      const parsedInteriorColor = interiorColor && interiorColor.name && interiorColor.hex
        ? [{ name: interiorColor.name, hex: interiorColor.hex }]
        : undefined;
  
      const parsedExteriorColor = exteriorColor && exteriorColor.name && exteriorColor.hex
        ? [{ name: exteriorColor.name, hex: exteriorColor.hex }]
        : undefined;
  
      // Prepare updated fields, ensuring undefined fields are not accidentally overwritten
      const updatedFields = {
        make,
        model: Array.isArray(model) ? model : model.split(',').map((m) => m.trim()),
        year,
        trim: Array.isArray(trim) ? trim : trim.split(',').map((t) => t.trim()),
        engine: Array.isArray(engine) ? engine : engine.split(',').map((e) => e.trim()),
        engineHorsepower: Array.isArray(engineHorsepower) ? engineHorsepower : engineHorsepower.split(',').map(Number),
        transmission: Array.isArray(transmission) ? transmission : transmission.split(',').map((t) => t.trim()),
        interiorColor: parsedInteriorColor ? parsedInteriorColor : undefined, // Only update if valid color is provided
        exteriorColor: parsedExteriorColor ? parsedExteriorColor : undefined, // Only update if valid color is provided
        features: Array.isArray(features) ? features : features.split(',').map((f) => f.trim()),
        price,
        quantity,
        location,
        available,
      };
  
      // Handle image upload
      if (imageUrl) {
        updatedFields.images = [imageUrl];
      }
  
      // Remove undefined values from the update payload
      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key] === undefined) {
          delete updatedFields[key];
        }
      });
  
      // Find and update the car
      const updatedCar = await Car.findByIdAndUpdate(
        carId,
        updatedFields,
        { new: true, runValidators: true } // Return the updated document and run validators
      );
  
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
  
      res.status(200).json({
        message: 'Car updated successfully',
        car: updatedCar,
      });
    } catch (error) {
      console.error('Error updating car:', error);
      res.status(500).json({ message: 'Failed to update car. Please try again later.' });
    }
  });

router.delete('/admin/cars/:carId', isAuthenticated, checkAdmin, async (req, res) => {
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

router.get('/admin/orders', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('configurationId').populate('car');

    // Map orders to include the full configuration details from the user's saved configurations
    const ordersWithConfigurations = orders.map((order) => {
      // Ensure the user and savedConfigurations exist
      const user = order.user;
      if (!user || !user.savedConfigurations) {
        return { ...order._doc, configuration: null };
      }

      // Find the configuration from the user's saved configurations matching the order's configurationId
      const configuration = user.savedConfigurations.find((config) =>
        config._id.equals(order.configurationId)
      );

      // Return the order with the configuration details
      return { ...order._doc, configuration: configuration || null };
    });

    // Send the processed orders as a response
    res.status(200).json(ordersWithConfigurations);
    } catch (error) {
        console.error(error)
    }
});

router.patch('/admin/orders/:orderId/accept', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const {orderId} = req.params

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: 'Accepted' },
            { new: true }
          );
        res.status(200).json({ message: `Order Accepted`,updatedOrder});
    } catch (error) {
        console.error(error)
    }
});
  

router.patch('/admin/orders/:orderId/reject', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const {orderId} = req.params
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: 'Rejected' },
            { new: true }
          );
        res.status(200).json({ message: "Order Rejected",updatedOrder });
    } catch (error) {
        console.error(error)
    }
})

// ===>>> Users

router.get('/admin/users', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error)
    }
    
});

router.get('/admin/users/:userId', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
    }
    
});

router.delete('/admin/users/:userId/delete', isAuthenticated, checkAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error)
    }
    
});

// ===>>> Inventory

router.get('/inventory/:carId',isAuthenticated, checkAdmin, async (req, res) => {
    try {
      const carInventory = await Car.find({ available: true })
      res.status(200).json(carInventory);
    } catch (error) {
        console.error(error)
    }
  });

  router.put('/admin/inventory/:carId', isAuthenticated, checkAdmin, async (req, res) => {
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


  router.delete('/cars/:carId/review/:reviewId', isAuthenticated, checkAdmin, async (req, res) => {
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