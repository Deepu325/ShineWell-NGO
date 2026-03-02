const Donor = require('../models/Donor');
const Campaign = require('../models/Campaign');
const { createOrder, verifySignature } = require('../services/razorpayService');

exports.initiateDonation = async (req, res) => {
    try {
        const { amount, name, email, type, campaignId } = req.body;

        if (!amount || !name || !email) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const order = await createOrder(amount);

        // Save initial donor record with pending status
        await Donor.create({
            name,
            email,
            amount,
            type: type || 'one-time',
            orderId: order.id,
            paymentId: 'pending',
            status: 'pending',
            campaignId: campaignId || null
        });

        res.status(200).json({
            success: true,
            order
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.verifyDonation = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (!isValid) {
            return res.status(400).json({ success: false, message: 'Invalid signature' });
        }

        // Update donor record
        const donor = await Donor.findOneAndUpdate(
            { orderId: razorpay_order_id },
            {
                paymentId: razorpay_payment_id,
                status: 'completed'
            },
            { new: true }
        );

        // If campaignId exists, update campaign collected amount
        if (donor && donor.campaignId) {
            await Campaign.findByIdAndUpdate(donor.campaignId, {
                $inc: { collectedAmount: donor.amount }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            donor
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const donations = await Donor.find().sort('-createdAt');
        res.status(200).json({ success: true, data: donations });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
