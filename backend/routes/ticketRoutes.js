import express from "express";
import QRCode from "qrcode";
import Event from "../models/Event.js";
import Ticket from "../models/Ticket.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const canDeleteBeforeEvent = (event) => {
  if (!event?.date) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate > today;
};

router.post("/", protect, async (req, res, next) => {
  try {
    const { name, eventId } = req.body;
    const email = req.user.email;

    if (!name || !eventId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const ticket = await Ticket.create({
      name,
      email,
      eventId,
      userId: req.user.id,
      paymentStatus: "not_required",
    });

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

router.get("/my", protect, async (req, res, next) => {
  try {
    const userTickets = await Ticket.find({
      userId: req.user.id,
    })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(userTickets);
  } catch (error) {
    next(error);
  }
});

router.get("/user/:email", protect, adminOnly, async (req, res, next) => {
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

router.put("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const { name, email, checkedIn, status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        name: String(name || "").trim(),
        email: String(email || "").toLowerCase().trim(),
        checkedIn: Boolean(checkedIn),
        status,
      },
      { new: true, runValidators: true }
    ).populate("eventId");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("eventId");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const isOwner = ticket.email === req.user.email;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (!isAdmin && !canDeleteBeforeEvent(ticket.eventId)) {
      return res
        .status(400)
        .json({ message: "Ticket can only be deleted before the event date" });
    }

    await ticket.deleteOne();
    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, adminOnly, async (req, res, next) => {
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
