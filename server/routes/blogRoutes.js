const express = require('express');
const { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');
const { uploadBlog } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.use(protect);
router.use(authorize('admin', 'editor'));

router.post('/', uploadBlog.single('featuredImage'), createBlog);
router.put('/:id', uploadBlog.single('featuredImage'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
