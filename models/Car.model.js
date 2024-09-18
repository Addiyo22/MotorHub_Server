const { Schema, model} = require("mongoose");

const carSchema = new Schema({
    make: { 
        type: String, 
        required: true
        /* enum: ['Mercedes', 'BMW', 'Toyota','Volkswagen']  */ 
    },
    model: { 
        type: String, 
        required: true 
    },
    year: { 
        type: String, 
        required: true 
    },
    trim: { 
        type: String 
    },
    engine: { 
        type: String 
    },
    engineHorsepower: { 
        type: Number 
    },
    transmission: { 
        type: String,
        enum: ['Automatic', 'Manual', 'CVT','DSG'] 
    },
    interiorColor: { 
        type: String 
    },
    exteriorColor: { 
        type: String 
    },
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
    }
}, { timestamps: true }); 

const Car = model('Car', carSchema);

module.exports = Car;