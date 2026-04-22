import express from "express";

const router = express.Router();

let events = [
  {
    id: "1",
    title: "Tech Meetup",
    date: "Dec 15",
    location: "Bengaluru",
  },
];

// GET ALL EVENTS
router.get("/", (req, res) => {
  res.json(events);
});

// GET EVENT BY ID
router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});

export default router;