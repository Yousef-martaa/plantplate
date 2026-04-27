const express = require('express');
const router = express.Router();
const Review = require('../models/reviewModel');
const User = require('../models/userModel');

// POST review
router.post('/reviews', async (req, res) => {
  try {
    const { name, comment, rating, restaurantId, email } = req.body;

    // check required fields
    if (!name || !comment || !rating || !restaurantId || !email) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // find user by email

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // create review

    const review = new Review({
      name,
      comment,
      rating,
      restaurantId,
      userId: user._id   //  email to userId
    });

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


router.put('/reviews/:id', async (req, res) => {
  try {
    const { name, comment, rating } = req.body;

    if (!name || !comment || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updated = await Review.findByIdAndUpdate(
      req.params.id,
      { name, comment, rating },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json(updated);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/reviews/:id', async (req, res) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;