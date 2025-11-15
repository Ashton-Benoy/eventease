router.delete("/admin/events/:id", auth, adminOnly, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});
