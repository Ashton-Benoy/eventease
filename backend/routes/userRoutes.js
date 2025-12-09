// routes/userRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Import the protection middleware
const { getUserProfile } = require('../controllers/getUserProfile');
const { updateUserProfile } = require('../controllers/updateProfile');
const { getMyEvents } = require('../controllers/myEvents');

const router = express.Router();

// Route for fetching and updating the logged-in user's profile
router.route('/profile')
  .get(protect, getUserProfile) // GET /api/v1/users/profile
  .put(protect, updateUserProfile); // PUT /api/v1/users/profile

// Route for getting all tickets/events for the logged-in user
router.route('/my-events')
  .get(protect, getMyEvents); // GET /api/v1/users/my-events

module.exports = router;