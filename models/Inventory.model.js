const { Schema, model } = require("mongoose");

const inventorySchema = new Schema({
    car: { 
        type: Schema.Types.ObjectId, 
        ref: 'Car',  
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 0  
    },
    location: { 
        type: String, 
        required: true 
    }
}, { timestamps: true });

const Inventory = model('Inventory', inventorySchema);

module.exports = Inventory;
