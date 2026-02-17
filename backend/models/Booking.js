const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bookingDate: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
  paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);