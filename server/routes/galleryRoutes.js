const express = require('express');
const { getGallery, createGallery, updateGallery, deleteGallery } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadGallery } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getGallery);

// Protected routes (Admin only)
router.use(protect);
router.use(authorize('admin'));

router.post('/', uploadGallery.single('image'), createGallery);
router.put('/:id', uploadGallery.single('image'), updateGallery);
router.delete('/:id', deleteGallery);

module.exports = router;
