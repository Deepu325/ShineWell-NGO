const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Storage for Gallery
const galleryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shinewell/gallery',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
    }
});

// Storage for Blog
const blogStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shinewell/blog',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        transformation: [{ width: 1600, height: 900, crop: 'limit', quality: 'auto', fetch_format: 'auto' }]
    }
});

const uploadGallery = multer({ storage: galleryStorage });
const uploadBlog = multer({ storage: blogStorage });

module.exports = {
    uploadGallery,
    uploadBlog
};
