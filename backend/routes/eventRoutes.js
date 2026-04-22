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

// ADD EVENT
router.post("/", (req, res) => {
  const { title, date, location } = req.body;

  const newEvent = {
    id: Date.now().toString(),
    title,
    date,
    location,
  };

  events.push(newEvent);
  res.json(newEvent);
});

// DELETE EVENT
router.delete("/:id", (req, res) => {
  events = events.filter(e => e.id !== req.params.id);
  res.json({ success: true });
});

export default router;