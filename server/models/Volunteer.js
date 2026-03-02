const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: [true, 'Please provide a phone number']
    },
    interestArea: {
        type: String,
        required: [true, 'Please select an interest area']
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'active', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
