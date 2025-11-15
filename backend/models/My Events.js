router.get("/events/my-events", auth, async (req, res) => {
  const events = await Event.find({ createdBy: req.user.id });
  res.json(events);
});
