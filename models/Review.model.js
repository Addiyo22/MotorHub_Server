const { Schema, model } = require("mongoose");

const reviewSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    car: { 
        type: Schema.Types.ObjectId, 
        ref: 'Car',  
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    comment: { 
        type: String 
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

const Review = model('Review', reviewSchema);

module.exports = Review;