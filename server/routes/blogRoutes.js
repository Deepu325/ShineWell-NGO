const express = require('express');
const { createBlog, getBlogs, getBlogBySlug, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

router.use(protect);
router.use(authorize('admin', 'editor'));

router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
