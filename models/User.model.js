const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    savedConfigurations: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Order'  
    }],
    isAdmin: { 
        type: Boolean, 
        default: false
    }
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;
