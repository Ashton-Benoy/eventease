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
  const users = await User.find().select("-password -passwordHash");
  res.json(users);
});

router.patch("/:id/status", protect, adminOnly, async (req, res, next) => {
  try {
    const { isActive, inactiveReason = "" } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isActive: Boolean(isActive),
        inactiveReason: isActive ? "" : inactiveReason,
      },
      { new: true }
    ).select("-password -passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
