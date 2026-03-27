const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shinewell-ngo')
    .then(async () => {
        try {
            // Check if admin already exists
            let admin = await User.findOne({ email: 'admin@shinewellngo.org' });
            if (!admin) {
                admin = new User({
                    name: 'Admin User',
                    email: 'admin@shinewellngo.org',
                    password: 'password123',
                    role: 'admin'
                });
                await admin.save();
                console.log('Admin user created successfully');
            } else {
                console.log('Admin user already exists');
            }
            process.exit(0);
        } catch (error) {
            console.error('Error creating admin:', error);
            process.exit(1);
        }
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
