const express = require('express');
const router = express.Router();

const {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
  getTopRated
} = require('../controllers/restaurantController');

router.post('/restaurants', createRestaurant);
router.get('/restaurants', getRestaurants);
router.put('/restaurants/:id', updateRestaurant);
router.delete('/restaurants/:id', deleteRestaurant);
router.get('/restaurants/top', getTopRated);

module.exports = router;