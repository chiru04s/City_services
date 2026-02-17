const express = require('express');
const router = express.Router();
const { getServices, getServiceById, createService, updateService, deleteService, getFeaturedServices } = require('../controllers/serviceController');
const { protect, admin, provider } = require('../middleware/authMiddleware');

router.get('/', getServices);
router.get('/featured', getFeaturedServices);
router.get('/:id', getServiceById);
router.post('/', protect, provider, createService);
router.put('/:id', protect, provider, updateService);
router.delete('/:id', protect, admin, deleteService);

module.exports = router;