const Restaurant = require('../models/restaurantModel');

exports.createRestaurant = async (req, res) => {
  try {

    const { name, city, veganLevel, rating, googleMapsUrl } = req.body;
    if (!name || !city || !veganLevel || !rating || !googleMapsUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRestaurant = await Restaurant.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const { city, name, veganLevel } = req.query;

    let query = {};

    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (veganLevel) {
      query.veganLevel = veganLevel;
    }
    
    if (req.query.minRating) {
      query.rating = { $gte: Number(req.query.minRating) };
    }

    const restaurants = await Restaurant.find(query);

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const { name, city, veganLevel, rating, googleMapsUrl } = req.body;

    if (!name || !city || !veganLevel || !rating || !googleMapsUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopRated = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .sort({ rating: -1 })
      .limit(5);

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};