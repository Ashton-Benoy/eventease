import express from "express";
import { io } from "../index.js";
import QRCode from "qrcode";

const router = express.Router();

let tickets = [];

router.post("/", (req, res) => {
  const { eventId, name, email } = req.body;

  const ticket = {
    id: Date.now().toString(),
    eventId,
    name,
    email,
    checkedIn: false,
    createdAt: new Date(),
  };

  tickets.push(ticket);

  io.to(`event-${eventId}`).emit("attendee-added", ticket);

  res.json(ticket);
});

router.get("/event/:eventId", (req, res) => {
  res.json(tickets.filter(t => t.eventId === req.params.eventId));
});

router.post("/:id/checkin", (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ error: "Not found" });

  ticket.checkedIn = true;
  io.to(`event-${ticket.eventId}`).emit("attendee-checked-in", ticket);

  res.json(ticket);
});

export default router;
