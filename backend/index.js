require('dotenv').config();

const express = require('express');
const cors = require('cors');
const process = require('process');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Optional: connect to Mongo if MONGO_URL present
let mongoose;
let TicketModel = null;
async function tryConnectMongo() {
  if (!process.env.MONGO_URL) {
    console.log('MONGO_URL not set — using in-memory ticket store.');
    return;
  }
  try {
    mongoose = require('mongoose');
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected');

    const ticketSchema = new mongoose.Schema({
      eventId: String,
      name: String,
      email: String,
      createdAt: { type: Date, default: Date.now },
    });

    TicketModel = mongoose.model('Ticket', ticketSchema);
  } catch (err) {
    console.error('Failed to connect MongoDB — falling back to in-memory store:', err.message);
    TicketModel = null;
  }
}

// In-memory tickets fallback
const inMemoryTickets = {};
let nextTicketId = 1;

// Basic ping route
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, time: Date.now() });
});

// Demo events route
app.get('/api/events', (req, res) => {
  res.json([
    { id: '1', title: 'Tech Meetup', date: '2025-12-18', location: 'Bengaluru' },
    { id: '2', title: 'Design Workshop', date: '2026-01-10', location: 'Mumbai' },
  ]);
});

// Create a ticket (no payment) - Pay at venue / Reserve
app.post('/api/tickets', async (req, res) => {
  try {
    const { eventId, name = 'Guest', email = '' } = req.body || {};
    if (!eventId) return res.status(400).json({ error: 'eventId is required' });

    if (TicketModel) {
      const doc = await TicketModel.create({ eventId, name, email });
      return res.json({ ticketId: doc._id.toString(), eventId: doc.eventId, name: doc.name, email: doc.email });
    } else {
      // in-memory fallback
      const id = (nextTicketId++).toString();
      const t = { ticketId: id, eventId, name, email, createdAt: new Date().toISOString() };
      inMemoryTickets[id] = t;
      return res.json(t);
    }
  } catch (err) {
    console.error('Create ticket error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get ticket by id
app.get('/api/tickets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    if (TicketModel) {
      const doc = await TicketModel.findById(id).lean();
      if (!doc) return res.status(404).json({ error: 'Ticket not found' });
      return res.json({ ticketId: doc._id.toString(), eventId: doc.eventId, name: doc.name, email: doc.email, createdAt: doc.createdAt });
    } else {
      const t = inMemoryTickets[id];
      if (!t) return res.status(404).json({ error: 'Ticket not found' });
      return res.json(t);
    }
  } catch (err) {
    console.error('Get ticket error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

async function startServer() {
  await tryConnectMongo();
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});