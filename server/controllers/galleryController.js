const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
exports.getGallery = async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category && category !== 'all') {
            query.category = category;
        }

        const gallery = await Gallery.find(query).sort('-createdAt');
        res.status(200).json({ success: true, count: gallery.length, data: gallery });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Create a new gallery item
// @route   POST /api/gallery
// @access  Private/Admin
exports.createGallery = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        // With Cloudinary, req.file.path is the secure URL
        const imageURL = req.file.path;

        const galleryData = {
            ...req.body,
            imageURL
        };

        const gallery = await Gallery.create(galleryData);
        res.status(201).json({ success: true, data: gallery });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Private/Admin
exports.updateGallery = async (req, res) => {
    try {
        let gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        const updatedData = { ...req.body };

        // If a new file is uploaded
        if (req.file) {
            // Delete old local file if it exists
            if (gallery.imageURL.startsWith('/uploads/')) {
                const oldImagePath = path.join(__dirname, '..', gallery.imageURL);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Note: Cloudinary deletion of old image would require public_id
            // For now, we update to new Cloudinary URL
            updatedData.imageURL = req.file.path;
        }

        gallery = await Gallery.findByIdAndUpdate(req.params.id, updatedData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: gallery });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
exports.deleteGallery = async (req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        if (!gallery) {
            return res.status(404).json({ success: false, message: 'Gallery item not found' });
        }

        // Delete local file if it exists
        if (gallery.imageURL.startsWith('/uploads/')) {
            const imagePath = path.join(__dirname, '..', gallery.imageURL);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Gallery.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Gallery item deleted' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
