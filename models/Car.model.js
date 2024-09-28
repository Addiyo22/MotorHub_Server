const mongoose = require('mongoose'); // Import mongoose
const { Schema, model } = mongoose;

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hex: { type: String, required: true }, // Hex value for displaying the color
  });

const carSchema = new Schema({
    make: { 
        type: String, 
        required: true
    },
    model: [{ 
        type: String, 
        required: true 
    }],
    year: { 
        type: String, 
        required: true 
    },
    trim: [{ 
        type: String 
    }],
    engine: [{ 
        type: String 
    }],
    engineHorsepower: [{ 
        type: Number 
    }],
    transmission: [{ 
        type: String,
    }],
    interiorColor: [colorSchema],
    exteriorColor: [colorSchema],
    features: [String],
    price: { 
        type: Number, 
        required: true 
    },
    available: { 
        type: Boolean, 
        default: true 
    },
    quantity: {
        type: Number
    },
    location: {
        type: String
    },
    images: [String],
}, { timestamps: true }); 

const Car = model('Car', carSchema);

module.exports = Car;