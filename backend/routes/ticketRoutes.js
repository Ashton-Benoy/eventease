import express from "express";

const router = express.Router();


const tickets = [];


router.post("/", (req, res) => {
  const { name, email, eventId } = req.body;

  if (!name || !email || !eventId) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const ticket = {
    id: Date.now().toString(),
    name,
    email,
    eventId,
  };

  tickets.push(ticket);
  res.json({ success: true, ticket });
});


router.get("/:id", (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id);
  if (!ticket) return res.status(404).json({ message: "Ticket not found" });
  res.json(ticket);
});


router.get("/user/:email", (req, res) => {
  const userTickets = tickets.filter(
    t => t.email === req.params.email
  );
  res.json(userTickets);
});
router.get("/", (req, res) => {
  res.json(tickets);
});

export default router;
