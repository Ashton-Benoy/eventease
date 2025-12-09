// controllers/myEvents.js
const Ticket = require('../models/Ticket');

// @desc    Get all events (tickets) purchased by the logged-in user
// @route   GET /api/v1/users/my-events
// @access  Protected
exports.getMyEvents = async (req, res) => {
  // Find all tickets belonging to the logged-in user ID
  const tickets = await Ticket.find({ user: req.user._id })
    .populate('event') // Populate the full event details from the Event model
    .select('-user'); // Exclude the user ID from the result since we already know it

  res.json(tickets);
};