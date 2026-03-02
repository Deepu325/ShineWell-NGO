const express = require('express');
const { getImpactStats, updateImpactStat } = require('../controllers/impactController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getImpactStats);
router.put('/:id', protect, authorize('admin'), updateImpactStat);

module.exports = router;
