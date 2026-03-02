const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        trim: true
    },
    value: {
        type: String,
        required: true
    },
    icon: {
        type: String, // icon name for lucide-react
        default: 'Users'
    },
    order: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Impact', impactSchema);
