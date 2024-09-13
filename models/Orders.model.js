const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    configuration: {
        type: Schema.Types.ObjectId,
        ref: 'Configuration', 
        required: true
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
