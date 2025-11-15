import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();


router.get("/check-user", protect, (req, res) => {
  res.json({ message: "User route OK", user: req.user });
});

router.get("/check-admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin route OK", user: req.user });
});


router.get("/", protect, adminOnly, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
