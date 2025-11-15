router.get("/admin/users", auth, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
