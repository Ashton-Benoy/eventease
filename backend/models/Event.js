const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketTypeSchema = new Schema({
  name: String,
  priceCents: Number,
  quantity: Number,
  sold: { type: Number, default: 0 }
});

const EventSchema = new Schema({
  title: String,
  description: String,
  startAt: Date,
  endAt: Date,
  location: String,
  organizer: { type: Schema.Types.ObjectId, ref: 'User' },
  tickets: [TicketTypeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
