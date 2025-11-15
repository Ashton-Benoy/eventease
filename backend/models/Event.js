const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  startTime: Date,
  endTime: Date,
  venue: String,
  price: { type: Number, required: true },
seatsLeft: { type: Number, required: true },
organizerName: { type: String, required: true },
category: { type: String, required: true },

  capacity: Number,
  price: Number,
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
