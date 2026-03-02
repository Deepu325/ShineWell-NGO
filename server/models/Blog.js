const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    content: {
        type: String,
        required: [true, 'Please provide content']
    },
    excerpt: {
        type: String,
        required: true
    },
    featuredImage: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    tags: [String],
    isPublished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create slug from title before saving
blogSchema.pre('save', function (next) {
    if (!this.isModified('title')) return next();
    this.slug = this.title
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
