const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
  event: { type: Schema.Types.ObjectId, ref: 'Event' },
  ticketTypeName: String,
  priceCents: Number,
  buyerName: String,
  buyerEmail: String,
  paid: { type: Boolean, default: false },
  stripeSessionId: String,
  qrCodeData: String,
  checkedInAt: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ticket', TicketSchema);
