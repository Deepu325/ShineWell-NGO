const express = require('express');
const { createCampaign, getCampaigns, updateCampaign } = require('../controllers/campaignController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCampaigns);

router.use(protect);
router.use(authorize('admin'));

router.post('/', createCampaign);
router.put('/:id', updateCampaign);

module.exports = router;
