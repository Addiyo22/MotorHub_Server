const { Schema, model } = require("mongoose");

const configurationSchema = new Schema({
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
  engine: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  features: [String],
  totalPrice: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Configuration = model('Configuration', configurationSchema);

module.exports = Configuration;