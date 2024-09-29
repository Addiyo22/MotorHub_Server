
const mongoose = require('mongoose');
const Car = require('../models/Car.model');

const MONGO_URI = "mongodb+srv://raikaraditya2244:7Gnpt6cAUjXU5hBU@cluster0.da3tt.mongodb.net/MotorHub_Server" || "mongodb://127.0.0.1:27017/MotorHub";

const cars = [
    {
      "make": "Porsche",
      "model": ["911 Turbo"],
      "year": "2024",
      "trim": ["GTS"],
      "engine": ["3.8L Twin-Turbo V6"],
      "engineHorsepower": [640],
      "transmission": ["8-Speed PDK", "7-Speed Manual"],
      "interiorColor": [
        { "name": "Black", "hex": "#000000" },
        { "name": "Brown", "hex": "#654321" },
        { "name": "Grey", "hex": "#808080" }
      ],
      "exteriorColor": [
        { "name": "White", "hex": "#FFFFFF" },
        { "name": "Red", "hex": "#FF0000" },
        { "name": "Blue", "hex": "#0000FF" }
      ],
      "features": [
        "Navigation",
        "Bluetooth",
        "Heated Seats",
        "Sunroof",
        "Leather Seats",
        "Backup Camera"
      ],
      "price": 200000,
      "available": true,
      "images": [
        "https://www.ilusso.com/imagetag/2796/main/l/Used-2024-Porsche-911-Turbo-S-1705711428.jpg"
      ]
    },
    {
      "make": "Tesla",
      "model": ["Model X"],
      "year": "2024",
      "trim": ["Plaid"],
      "engine": ["Tri-Motor Electric"],
      "engineHorsepower": [1100],
      "transmission": ["Automatic"],
      "interiorColor": [
        { "name": "White", "hex": "#FFFFFF" },
        { "name": "Black", "hex": "#000000" },
        { "name": "Cream", "hex": "#F5F5DC" }
      ],
      "exteriorColor": [
        { "name": "Midnight Silver", "hex": "#30363D" },
        { "name": "Deep Blue", "hex": "#0066CC" },
        { "name": "Solid Black", "hex": "#0D0D0D" }
      ],
      "features": [
        "Autopilot",
        "All-Wheel Drive",
        "Panoramic Roof",
        "Adaptive Cruise Control",
        "Bose Sound System",
        "Fast Charging"
      ],
      "price": 140000,
      "available": true,
      "images": [
        "https://carsguide-res.cloudinary.com/image/upload/c_fit,h_726,w_1290,f_auto,t_cg_base/v1/editorial/story/hero_image/2017-Tesla-Model-X-suv-white-1001x565-(1).jpg"
      ]
    },
    {
      "make": "BMW",
      "model": ["M3"],
      "year": "2024",
      "trim": ["Competition"],
      "engine": ["4.4L Twin-Turbo V8"],
      "engineHorsepower": [617],
      "transmission": ["6-Speed Manual", "8-Speed Automatic"],
      "interiorColor": [
        { "name": "Red", "hex": "#FF0000" },
        { "name": "Black", "hex": "#000000" },
        { "name": "Beige", "hex": "#F5F5DC" }
      ],
      "exteriorColor": [
        { "name": "Alpine White", "hex": "#FFFFFF" },
        { "name": "Sapphire Black", "hex": "#1C1C1C" },
        { "name": "Tanzanite Blue", "hex": "#1C3C8C" }
      ],
      "features": [
        "Harman Kardon Sound System",
        "M Adaptive Suspension",
        "Carbon Fiber Roof",
        "Heated Steering Wheel",
        "Apple CarPlay",
        "Wireless Charging"
      ],
      "price": 100000,
      "available": true,
      "images": [
        "https://news.dupontregistry.com/wp-content/uploads/2023/11/DSC09425-scaled.jpg",
      ]
    },
    {
      "make": "Mercedes-Benz",
      "model": ["S-Class"],
      "year": "2024",
      "trim": ["AMG"],
      "engine": ["4.0L V8 Biturbo"],
      "engineHorsepower": [603],
      "transmission": ["7-Speed Automatic"],
      "interiorColor": [
        { "name": "Black", "hex": "#000000" },
        { "name": "Beige", "hex": "#F5F5DC" },
        { "name": "Brown", "hex": "#8B4513" }
      ],
      "exteriorColor": [
        { "name": "Iridium Silver", "hex": "#C0C0C0" },
        { "name": "Obsidian Black", "hex": "#1C1C1C" },
        { "name": "Emerald Green", "hex": "#50C878" }
      ],
      "features": [
        "360-Degree Camera",
        "Ventilated Seats",
        "Heads-Up Display",
        "Adaptive Air Suspension",
        "Wireless Phone Charging",
        "Burmester Sound System"
      ],
      "price": 150000,
      "available": true,
      "images": [
        "https://cdn-ds.com/blogs-media/sites/178/2024/02/23063003/Front-quarter-view-of-the-2024-Mercedes-Benz-S-Class-Black_A_o.jpg",
      ]
    },
    {
      "make": "Audi",
      "model": ["RS7"],
      "year": "2024",
      "trim": ["Prestige"],
      "engine": ["4.0L V8 TFSI"],
      "engineHorsepower": [591],
      "transmission": ["7-Speed S Tronic"],
      "interiorColor": [
        { "name": "Black", "hex": "#000000" },
        { "name": "Nougat Brown", "hex": "#8B4513" },
        { "name": "Rock Gray", "hex": "#808080" }
      ],
      "exteriorColor": [
        { "name": "Glacier White", "hex": "#EDEDED" },
        { "name": "Mythos Black", "hex": "#1A1A1A" },
        { "name": "Navarra Blue", "hex": "#1B4F72" }
      ],
      "features": [
        "Virtual Cockpit",
        "Bang & Olufsen Sound System",
        "Matrix LED Headlights",
        "Quattro All-Wheel Drive",
        "Lane Assist",
        "Sport Suspension"
      ],
      "price": 85000,
      "available": true,
      "images": [
        "https://cdn.motor1.com/images/mgl/6ZzvLZ/s1/2024-audi-rs7-performance-review.jpg",
      ]
    },
    {
      "make": "Lamborghini",
      "model": ["Urus"],
      "year": "2023",
      "trim": ["SVJ"],
      "engine": ["4.0L Twin-Turbo V8"],
      "engineHorsepower": [641],
      "transmission": ["8-Speed Automatic"],
      "interiorColor": [
        { "name": "Black", "hex": "#000000" },
        { "name": "Yellow", "hex": "#FFFF00" },
        { "name": "Orange", "hex": "#FFA500" }
      ],
      "exteriorColor": [
        { "name": "Giallo Inti", "hex": "#FFD700" },
        { "name": "Verde Mantis", "hex": "#00FF00" },
        { "name": "Rosso Mars", "hex": "#FF4500" }
      ],
      "features": [
        "Active Aerodynamics",
        "Rear-Wheel Steering",
        "Magnetorheological Suspension",
        "Bose Audio System"
      ],
      "price": 350000,
      "available": true,
      "images": [
        "https://i.gaw.to/vehicles/photos/40/36/403658-2024-lamborghini-urus.jpg?1024x640",
      ]
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