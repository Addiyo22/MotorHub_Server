const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
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
    configuration: {
        engine: { 
            type: String, 
            required: true 
        },
        transmission: { 
            type: String, 
            required: true 
        },
        features: { 
            type: String, 
            required: true 
        },
        color: { 
            type: String, 
            required: true 
        }
    },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'Shipped', 'Completed', 'Cancelled'],  
        default: 'Pending' 
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);

module.exports = Order;
