import Event from "../models/Event.js";

export const getAllEvents = async (_req, res, next) => {
  try {
    const events = await Event.find().sort({ startAt: 1, createdAt: -1 });
    res.json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    next(error);
  }
};
