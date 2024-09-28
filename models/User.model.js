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
    savedConfigurations: [
        {
          car: {
            type: Schema.Types.ObjectId,
            ref: 'Car',
            required: true
          },
          make: String,
          model: String,
          year: String,
          trim: String,
          engine: String,
          transmission: String,
          interiorColor: String,
          exteriorColor: String,
          features: [String],
          price: Number,
          isOrdered: {
            type: Boolean,
            default: false, 
            }
        }
      ],
    isAdmin: { 
        type: Boolean, 
        default: false,
        required: true
    }
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;