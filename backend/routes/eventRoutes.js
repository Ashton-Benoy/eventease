import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

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

router.post("/", async (req, res, next) => {
  try {
    const { title, date, location } = req.body;

    if (!title || !location) {
      return res
        .status(400)
        .json({ message: "Title and location are required" });
    }

    const event = await Event.create({
      ...req.body,
      date: date || "",
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
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
