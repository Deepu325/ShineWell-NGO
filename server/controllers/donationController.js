const Donor = require('../models/Donor');
const Campaign = require('../models/Campaign');

// Razorpay disabled for clean deployment
exports.initiateDonation = async (req, res) => {
    return res.status(503).json({
        success: false,
        message: "Payments temporarily disabled for maintenance. Please check back soon."
    });
};

exports.verifyDonation = async (req, res) => {
    return res.status(503).json({
        success: false,
        message: "Payments temporarily disabled for maintenance."
    });
};

exports.getDonations = async (req, res) => {
    try {
        const donations = await Donor.find().sort('-createdAt');
        res.status(200).json({ success: true, data: donations });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
