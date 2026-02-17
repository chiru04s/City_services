const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

const getServices = asyncHandler(async (req, res) => {
  const { category, search, minPrice, maxPrice, sort } = req.query;
  let query = { isActive: true };
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };

  let sortObj = { createdAt: -1 };
  if (sort === 'price_asc') sortObj = { price: 1 };
  if (sort === 'price_desc') sortObj = { price: -1 };
  if (sort === 'rating') sortObj = { rating: -1 };

  const services = await Service.find(query).populate('category', 'name icon').populate('provider', 'name avatar').sort(sortObj);
  res.json(services);
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id)
    .populate('category', 'name icon')
    .populate('provider', 'name email phone avatar');
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

const createService = asyncHandler(async (req, res) => {
  const service = await Service.create({ ...req.body, provider: req.user._id });
  res.status(201).json(service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  Object.assign(service, req.body);
  const updated = await service.save();
  res.json(updated);
});

const deleteService = asyncHandler(async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service removed' });
});

const getFeaturedServices = asyncHandler(async (req, res) => {
  const services = await Service.find({ isActive: true })
    .populate('category', 'name icon')
    .populate('provider', 'name avatar')
    .sort({ rating: -1 }).limit(8);
  res.json(services);
});

module.exports = { getServices, getServiceById, createService, updateService, deleteService, getFeaturedServices };