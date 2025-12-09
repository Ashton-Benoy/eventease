// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  // Link to the organizer who created the event
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  // Location/Venue Management
  venue: {
    name: String,
    address: String,
    capacity: Number,
  },
  // Event Status (e.g., Active, Cancelled, Completed)
  status: {
    type: String,
    enum: ['Active', 'Draft', 'Cancelled', 'Completed'],
    default: 'Draft',
  },
  // Ticket information placeholder (Actual Ticket logic is in the Ticket model)
  ticketTiers: [{
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: String,
  }],
  // For front-end display/marketing
  imageUrl: {
    type: String,
    default: '/images/default_event.jpg',
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;