const Blog = require('../models/Blog');
const path = require('path');
const fs = require('fs');

exports.createBlog = async (req, res) => {
    try {
        req.body.author = req.user.id;

        if (req.file) {
            req.body.featuredImage = req.file.path;
        }

        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        // Optionally check for auth token to allow admin to see drafts
        let isAdmin = false;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                const jwt = require('jsonwebtoken');
                const User = require('../models/User');
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                if (user && (user.role === 'admin' || user.role === 'editor')) {
                    isAdmin = true;
                }
            } catch (e) {
                // Token invalid, treat as public request
            }
        }

        const query = isAdmin ? {} : { isPublished: true };
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
        if (req.file) {
            req.body.featuredImage = req.file.path;

            // If the old image was local, we should delete it
            const oldBlog = await Blog.findById(req.params.id);
            if (oldBlog && oldBlog.featuredImage && oldBlog.featuredImage.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', oldBlog.featuredImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Delete local file if it exists
        if (blog.featuredImage && blog.featuredImage.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', blog.featuredImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Blog deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
