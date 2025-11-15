import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
   
    const { password: _p, ...userSafe } = user.toObject();
    return res.status(201).json({ message: "User registered", user: userSafe });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    const { password: _p, ...userSafe } = user.toObject();
    return res.json({ message: "Login successful", token, user: userSafe });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(404).json({ message: "User not found" });
    return res.json(req.user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
