import express from "express";
import QRCode from "qrcode";
import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { name, email, eventId } = req.body;

    if (!name || !email || !eventId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const ticket = await Ticket.create({ name, email, eventId });
    const qrCode = await QRCode.toDataURL(
      JSON.stringify({
        ticketId: ticket.id,
        eventId: event.id,
      })
    );

    ticket.qrCode = qrCode;
    await ticket.save();

    res.status(201).json({ success: true, ticket });
  } catch (error) {
    next(error);
  }
});

router.get("/user/:email", async (req, res, next) => {
  try {
    const userTickets = await Ticket.find({
      email: req.params.email.toLowerCase(),
    })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(userTickets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("eventId");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const query = req.query.eventId ? { eventId: req.query.eventId } : {};
    const tickets = await Ticket.find(query)
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

export default router;
