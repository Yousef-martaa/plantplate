const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  veganLevel: {
    type: String,
    enum: ['Fully Vegan', 'Vegan Friendly', 'Has Options'],
    required: true
  },
  googleMapsUrl: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);