const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  priceType: { type: String, enum: ['fixed', 'hourly', 'starting'], default: 'fixed' },
  image: { type: String, default: '' },
  duration: { type: String, default: '1-2 hours' },
  tags: [String],
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  location: { type: String, default: 'All Areas' },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);