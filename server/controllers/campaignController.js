const Campaign = require('../models/Campaign');

exports.createCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.create(req.body);
        res.status(201).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ isActive: true }).sort('-createdAt');
        res.status(200).json({ success: true, data: campaigns });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
    try {
        const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
