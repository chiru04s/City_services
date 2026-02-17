const Category = require('../models/Category');
const asyncHandler = require('express-async-handler');

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true });
  res.json(categories);
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: 'Category removed' });
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };