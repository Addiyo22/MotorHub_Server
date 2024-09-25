const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',  
        required: true 
    },
    configurationId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
    totalPrice: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Accepted', 'Rejected','Pending'],  
        default: 'Pending' 
    }
}, { timestamps: true });

const Order = model('Order', orderSchema);

module.exports = Order;
