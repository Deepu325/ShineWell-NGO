const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        lowercase: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR'
    },
    type: {
        type: String,
        enum: ['one-time', 'monthly'],
        default: 'one-time'
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    campaignId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Campaign'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Donor', donorSchema);
