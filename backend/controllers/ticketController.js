const TICKETS = [];

exports.createTicket = (req, res) => {
  const ticket = {
    ticketId: String(TICKETS.length + 1),
    ...req.body,
    createdAt: new Date(),
    checkedIn: false,
  };

  TICKETS.push(ticket);
  res.json(ticket);
};

exports.getTicketById = (req, res) => {
  const ticket = TICKETS.find(t => t.ticketId === req.params.id);

  if (!ticket) {
    return res.status(404).json({ error: "Ticket not found" });
  }

  res.json(ticket);
};
