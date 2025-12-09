// routes/eventRoutes.js
const express = require('express');
const { createEvent, getEventById, getEvents, updateEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const { isOrganizer } = require('../middleware/organizerCheck');

const router = express.Router();

// Routes for listing events and creating new ones
router.route('/')
  .get(getEvents) // GET /api/v1/events (Public list)
  .post(protect, isOrganizer, createEvent); // POST /api/v1/events (Protected)

// Routes for detailed view and updates
router.route('/:id')
  .get(getEventById) // GET /api/v1/events/:id (Public/Conditional)
  .put(protect, isOrganizer, updateEvent); // PUT /api/v1/events/:id (Protected)

module.exports = router;