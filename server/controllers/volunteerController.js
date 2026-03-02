const Volunteer = require('../models/Volunteer');

exports.registerVolunteer = async (req, res) => {
    try {
        const volunteer = await Volunteer.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Thank you for your interest! We will contact you soon.',
            data: volunteer
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getVolunteers = async (req, res) => {
    try {
        const volunteers = await Volunteer.find().sort('-createdAt');
        res.status(200).json({ success: true, count: volunteers.length, data: volunteers });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateVolunteerStatus = async (req, res) => {
    try {
        const volunteer = await Volunteer.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.status(200).json({ success: true, data: volunteer });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
