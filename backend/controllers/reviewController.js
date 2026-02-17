const Review = require('../models/Review');
const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

const createReview = asyncHandler(async (req, res) => {
  const { serviceId, rating, comment, bookingId } = req.body;
  const review = await Review.create({
    user: req.user._id, service: serviceId, rating, comment, booking: bookingId,
  });

  // Update service average rating
  const reviews = await Review.find({ service: serviceId });
  const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Service.findByIdAndUpdate(serviceId, { rating: avg.toFixed(1), numReviews: reviews.length });

  const populated = await review.populate('user', 'name avatar');
  res.status(201).json(populated);
});

const getServiceReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ service: req.params.serviceId })
    .populate('user', 'name avatar').sort({ createdAt: -1 });
  res.json(reviews);
});

module.exports = { createReview, getServiceReviews };