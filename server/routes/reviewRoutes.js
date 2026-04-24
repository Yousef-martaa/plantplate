const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');

// POST review
router.post('/reviews', async (req, res) => {
  try {
    const review = new Review(req.body);
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const { restaurantId } = req.query;

    let reviews;

    if (restaurantId) {
      reviews = await Review.find({ restaurantId });
    } else {
      reviews = await Review.find();
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/reviews/user/:userId', async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;