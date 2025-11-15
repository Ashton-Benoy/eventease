router.put("/update", auth, async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.user.id);

  user.name = name || user.name;
  user.email = email || user.email;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  await user.save();
  res.json({ message: "Profile updated" });
});
