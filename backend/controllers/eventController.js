// backend/controllers/eventController.js

const EVENTS = [
  {
    id: "1",
    title: "Tech Meetup",
    description: "A meetup for developers",
    date: "2025-01-10",
    location: "Bangalore",
    price: 0,
  },
  {
    id: "2",
    title: "Design Workshop",
    description: "Hands-on UI/UX workshop",
    date: "2025-02-05",
    location: "Mumbai",
    price: 0,
  },
];

exports.getAllEvents = (req, res) => {
  res.json(EVENTS);
};

exports.getEventById = (req, res) => {
  const event = EVENTS.find(e => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json(event);
};
