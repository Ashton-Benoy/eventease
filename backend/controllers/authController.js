import jwt from "jsonwebtoken";


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  const token = jwt.sign(
    { email, role: "user" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    token,
    user: { email, role: "user" },
  });
};


export const register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  res.json({
    message: "User registered (demo)",
  });
};


export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (
    email !== "admin@eventease.com" ||
    password !== "admin123"
  ) {
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
