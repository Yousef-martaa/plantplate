const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    minlength:3
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
  required: true
}
  
});


module.exports = mongoose.model('Review', reviewSchema);