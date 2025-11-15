router.post("/:id/rsvp", auth, async (req, res) => {
  const { response } = req.body;

  const event = await Event.findById(req.params.id);

  event.rsvp.push({
    user: req.user.id,
    response,
  });

  await event.save();
  res.json({ message: "RSVP saved" });
});
