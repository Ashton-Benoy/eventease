import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+passwordHash"
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordToCompare = user.password || user.passwordHash;
    const passwordMatches =
      passwordToCompare && (await bcrypt.compare(password, passwordToCompare));

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      token: signToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@eventease.com" || password !== "admin123") {
    return res.status(401).json({ error: "Invalid admin credentials" });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    admin: { email, role: "admin" },
  });
};
