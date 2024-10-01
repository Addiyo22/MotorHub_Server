const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    firstname: { 
        type: String, 
        required: true
    },
    lastname: { 
        type: String, 
        required: true
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