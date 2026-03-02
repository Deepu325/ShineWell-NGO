const express = require('express');
const { initiateDonation, verifyDonation, getDonations } = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/initiate', initiateDonation);
router.post('/verify', verifyDonation);
router.get('/', protect, authorize('admin'), getDonations);

module.exports = router;
