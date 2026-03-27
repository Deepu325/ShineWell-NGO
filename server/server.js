const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config(); // Standard loading
dotenv.config({ path: path.join(__dirname, '..', '.env') }); // Parent dir fallback for local dev

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
    "https://shine-well-ngo.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl) or from allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
    },
    credentials: true
}));
app.use(morgan('dev'));
app.use(helmet({
    contentSecurityPolicy: false, // For development ease
}));

// Serve Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database Connection
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
console.log("Connecting to MongoDB with URI:", mongoURI ? (mongoURI.substring(0, 20) + "...") : "undefined");

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes (to be implemented)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/donations', require('./routes/donationRoutes'));
app.use('/api/volunteers', require('./routes/volunteerRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/campaigns', require('./routes/campaignRoutes'));
app.use('/api/impact', require('./routes/impactRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));


// Root path for testing
app.get('/', (req, res) => {
    res.send('Shinewell NGO API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
