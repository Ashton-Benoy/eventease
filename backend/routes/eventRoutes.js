import express from "express";

const router = express.Router();


let events = [
  {
    id: "1",
    title: "Tech Conference",
    date: "2025-02-10",
    location: "Bangalore",
  },
  {
    id: "2",
    title: "Music Fest",
    date: "2025-03-05",
    location: "Mumbai",
  },
];


router.get("/", (req, res) => {
  res.json(events);
});


router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }
  res.json(event);
});


router.post("/", (req, res) => {
  const { title, date, location } = req.body;

  if (!title || !date || !location) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const newEvent = {
    id: Date.now().toString(),
    title,
    date,
    location,
  };

  events.push(newEvent);
  res.json(newEvent);
});


router.delete("/:id", (req, res) => {
  events = events.filter(e => e.id !== req.params.id);
  res.json({ success: true });
});

export default router;
