const Impact = require('../models/Impact');

exports.getImpactStats = async (req, res) => {
    try {
        const stats = await Impact.find().sort('order');
        res.status(200).json({ success: true, data: stats });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateImpactStat = async (req, res) => {
    try {
        const stat = await Impact.findByIdAndUpdate(req.params.id, req.body, { new: true, upsert: true });
        res.status(200).json({ success: true, data: stat });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
