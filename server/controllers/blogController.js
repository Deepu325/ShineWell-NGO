const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
    try {
        req.body.author = req.user.id;
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const query = req.user ? {} : { isPublished: true };
        const blogs = await Blog.find(query).populate('author', 'name').sort('-createdAt');
        res.status(200).json({ success: true, count: blogs.length, data: blogs });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name');
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
