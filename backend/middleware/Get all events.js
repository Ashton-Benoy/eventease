router.get("/admin/events", auth, adminOnly, async (req, res) => {
  const events = await Event.find().populate("createdBy", "name email");
  res.json(events);
});
