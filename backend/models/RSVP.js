const mongoose = require('mongoose');
const { Schema } = mongoose;

const RSVPSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  name: String,
  email: String,
  status: { type: String, enum: ['pending','attending','not-attending'], default: 'pending' },
  guests: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RSVP', RSVPSchema);
