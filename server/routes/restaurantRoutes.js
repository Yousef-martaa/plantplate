const express = require('express');
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurantController');

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getRestaurants);
router.put('/restaurants/:index', updateRestaurant);
router.delete('/restaurants/:index', deleteRestaurant);

module.exports = router;