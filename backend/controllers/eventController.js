// controllers/eventController.js
const Event = require('../models/Event');

// @desc    Create a new event
// @route   POST /api/v1/events
// @access  Protected (Organizer Only)
exports.createEvent = async (req, res) => {
  const { title, description, startTime, endTime, venue, ticketTiers } = req.body;
  
  if (!title || !description || !startTime || !endTime) {
    return res.status(400).json({ message: 'Please include title, description, start time, and end time.' });
  }

  try {
    const event = await Event.create({
      organizer: req.user._id, // User ID attached by protect middleware
      title,
      description,
      startTime,
      endTime,
      venue: venue || {},
      ticketTiers: ticketTiers || [],
      status: 'Draft',
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Event creation failed', error: error.message });
  }
};

// @desc    Get a single event by ID
// @route   GET /api/v1/events/:id
// @access  Public (or Protected if private event)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Simple check: Only return active events to the public
    if (!event.isPublic && (!req.user || event.organizer._id.toString() !== req.user._id.toString())) {
       return res.status(404).json({ message: 'Event not found or is private' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving event', error: error.message });
  }
};

// @desc    Get all public events
// @route   GET /api/v1/events
// @access  Public
exports.getEvents = async (req, res) => {
  // Fetch only public, active events. You can add more complex filtering here.
  const events = await Event.find({ isPublic: true, status: 'Active' })
    .sort({ startTime: 1 }) // Sort by start time
    .select('-__v'); // Exclude mongoose version key
    
  res.json(events);
};

// @desc    Update an event
// @route   PUT /api/v1/events/:id
// @access  Protected (Organizer Only, must be the owner)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if the logged-in user is the event organizer
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    // Use findByIdAndUpdate to merge new data
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true,
    });

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Event update failed', error: error.message });
  }
};