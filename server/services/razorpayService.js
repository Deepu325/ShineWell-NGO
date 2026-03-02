const Razorpay = require('razorpay');
const crypto = require('crypto');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (amount, currency = 'INR') => {
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency,
        receipt: `receipt_${Date.now()}`,
    };
    return await instance.orders.create(options);
};

exports.verifySignature = (orderId, paymentId, signature) => {
    const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');
    return generatedSignature === signature;
};
