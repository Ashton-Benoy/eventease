// routes/ticketRoutes.js
const express = require('express');
const { generateTicket, checkInAttendee } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');
const { isOrganizer } = require('../middleware/organizerCheck');

const router = express.Router();

// Public route that usually runs after payment confirmation
router.post('/generate', protect, generateTicket); 

// Private route for organizers/staff to check attendees in
router.post('/checkin', protect, isOrganizer, checkInAttendee);

module.exports = router;