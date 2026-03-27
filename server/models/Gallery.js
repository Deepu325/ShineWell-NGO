const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    imageURL: {
        type: String,
        required: [true, 'Please provide an image URL']
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
        enum: ['event', 'volunteer', 'community', 'education', 'healthcare', 'livelihood', 'environment', 'other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Gallery', gallerySchema);
