import express from "express";
import Event from "../models/Event.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

const eventPayload = (body) => ({
  title: String(body.title || "").trim(),
  date: body.date || "",
  location: String(body.location || "").trim(),
  description: String(body.description || "").trim(),
  price: Math.max(Number(body.price || 0), 0),
});

router.get("/", async (_req, res, next) => {
  try {
    const events = await Event.find().sort({ startAt: 1, createdAt: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const payload = eventPayload(req.body);
    const { title, date, location } = payload;

    if (!title || !location) {
      return res
        .status(400)
        .json({ message: "Title and location are required" });
    }

    const event = await Event.create({
      ...payload,
      date: date || "",
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const payload = eventPayload(req.body);
    const { title, location } = payload;

    if (!title || !location) {
      return res
        .status(400)
        .json({ message: "Title and location are required" });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;
