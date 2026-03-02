const express = require('express');
const { registerVolunteer, getVolunteers, updateVolunteerStatus } = require('../controllers/volunteerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerVolunteer);
router.get('/', protect, authorize('admin'), getVolunteers);
router.patch('/:id/status', protect, authorize('admin'), updateVolunteerStatus);

module.exports = router;
