const Booking = require('../models/Booking');
const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

const createBooking = asyncHandler(async (req, res) => {
  const { serviceId, bookingDate, timeSlot, address, phone, notes, paymentMethod } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const booking = await Booking.create({
    user: req.user._id, service: serviceId,
    provider: service.provider, bookingDate, timeSlot,
    address, phone, notes, totalAmount: service.price,
    paymentMethod: paymentMethod || 'cash',
  });
  const populated = await booking.populate(['service', 'provider']);
  res.status(201).json(populated);
});

const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('service', 'name image price')
    .populate('provider', 'name phone')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({})
    .populate('user', 'name email')
    .populate('service', 'name price')
    .populate('provider', 'name')
    .sort({ createdAt: -1 });
  res.json(bookings);
});

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  booking.status = req.body.status || booking.status;
  booking.paymentStatus = req.body.paymentStatus || booking.paymentStatus;
  const updated = await booking.save();
  res.json(updated);
});

const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found' });
  if (booking.user.toString() !== req.user._id.toString())
    return res.status(403).json({ message: 'Not authorized' });
  booking.status = 'cancelled';
  await booking.save();
  res.json({ message: 'Booking cancelled' });
});

module.exports = { createBooking, getMyBookings, getAllBookings, updateBookingStatus, cancelBooking };