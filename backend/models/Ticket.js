router.post("/", async (req, res) => {
  const { eventId, name, email } = req.body;

  const ticketId = Date.now().toString();

  const ticket = {
    id: ticketId,
    eventId,
    name,
    email,
    checkedIn: false,
    createdAt: new Date(),
  };

  // 🔥 Generate QR code that contains ticketId
  const qrData = JSON.stringify({
    ticketId,
    eventId,
  });

  const qrCode = await QRCode.toDataURL(qrData);

  ticket.qrCode = qrCode;

  tickets.push(ticket);

  io.to(`event-${eventId}`).emit("attendee-added", ticket);

  res.json(ticket);
});
