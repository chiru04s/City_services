const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalServices, totalBookings, categories] = await Promise.all([
    User.countDocuments({ role: 'user' }),
    Service.countDocuments(),
    Booking.countDocuments(),
    Category.countDocuments(),
  ]);

  const revenueData = await Booking.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);

  const recentBookings = await Booking.find({})
    .populate('user', 'name').populate('service', 'name price')
    .sort({ createdAt: -1 }).limit(5);

  const bookingsByStatus = await Booking.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.json({
    stats: {
      totalUsers, totalServices, totalBookings, categories,
      revenue: revenueData[0]?.total || 0,
    },
    recentBookings,
    bookingsByStatus,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
});

const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
  res.json(user);
});

const toggleUserStatus = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isActive = !user.isActive;
  await user.save();
  res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}` });
});

module.exports = { getDashboardStats, getAllUsers, updateUserRole, toggleUserStatus };