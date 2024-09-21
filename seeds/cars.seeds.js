
const mongoose = require('mongoose');
const Car = require('../models/Car.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/MotorHub";

const cars = [
    {
      "make": "Porsche",
      "model": "911 Carrera",
      "year": "2024",
      "trim": "Base",
      "engine": "3.0L Twin-Turbo Flat-6",
      "engineHorsepower": 379,
      "transmission": "8-Speed Automatic",
      "interiorColor": ["Black", "Beige", "Red"],
      "exteriorColor": ["White", "Black", "Silver", "Red", "Blue"],
      "features": ["Navigation", "Bluetooth", "Heated Seats"],
      "price": 105000
    },
    {
      "make": "Porsche",
      "model": "911 Turbo S",
      "year": "2024",
      "trim": "Turbo S",
      "engine": "3.8L Twin-Turbo Flat-6",
      "engineHorsepower": 640,
      "transmission": "8-Speed PDK",
      "interiorColor": ["Black", "Red", "Gray"],
      "exteriorColor": ["White", "Black", "Yellow", "Green"],
      "features": ["Sunroof", "Leather Seats", "Backup Camera", "Sport Chrono Package"],
      "price": 210000
    },
    {
      "make": "Porsche",
      "model": "Cayenne",
      "year": "2024",
      "trim": "S",
      "engine": "2.9L Twin-Turbo V6",
      "engineHorsepower": 434,
      "transmission": "8-Speed Automatic",
      "interiorColor": ["Black", "Beige"],
      "exteriorColor": ["White", "Black", "Gray", "Blue"],
      "features": ["All-Wheel Drive", "Panoramic Roof", "Adaptive Cruise Control"],
      "price": 89000
    },
    {
      "make": "Porsche",
      "model": "Panamera",
      "year": "2024",
      "trim": "4S E-Hybrid",
      "engine": "2.9L Twin-Turbo V6 Hybrid",
      "engineHorsepower": 552,
      "transmission": "8-Speed PDK",
      "interiorColor": ["Black", "Brown"],
      "exteriorColor": ["White", "Black", "Silver"],
      "features": ["Hybrid System", "Leather Seats", "Bose Sound System"],
      "price": 115000
    },
    {
      "make": "Porsche",
      "model": "Taycan",
      "year": "2024",
      "trim": "Turbo",
      "engine": "Electric Motor",
      "engineHorsepower": 670,
      "transmission": "2-Speed Automatic",
      "interiorColor": ["Black", "White"],
      "exteriorColor": ["Blue", "White", "Gray"],
      "features": ["Electric Powertrain", "Autonomous Driving", "Fast Charging"],
      "price": 150000
    }
  ]
  
  

mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`)

    // Create new documents in the books collection
    return Car.insertMany(cars);
  })
  .then((carsFromDB) => {
    return mongoose.connection.close()
  })
  .then(() => {
    // Once the DB connection is closed, print a message
    console.log('DB connection closed!')
  })
  .catch(err => {
    console.log(`An error occurred while creating books from the DB: ${err}`)
  });