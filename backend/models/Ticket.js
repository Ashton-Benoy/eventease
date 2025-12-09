// models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // <-- This MUST match the model name used above
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', // Assuming you have an Event model
    required: true,
  },
  ticketType: {
    type: String,
    required: true,
    // Add enum if you want to enforce specific types (e.g., 'VIP', 'Standard')
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Paid', 'CheckedIn', 'Cancelled'],
    default: 'Paid',
  },
  qrCodeData: {
    type: String, // Unique string used for QR Code generation and verification
    required: true,
    unique: true,
  },
  // We can track the check-in time and staff later
  checkedInAt: {
    type: Date,
    default: null,
  }
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;