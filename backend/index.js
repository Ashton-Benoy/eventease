import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import promoRoutes from "./routes/promoRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const authAttempts = new Map();

const securityHeaders = (_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "camera=(self), microphone=(), geolocation=()");
  next();
};

const limitRequests = (maxRequests, windowMs) => (req, res, next) => {
  const key = `${req.ip}:${req.originalUrl}`;
  const now = Date.now();
  const attempt = authAttempts.get(key) || { count: 0, resetAt: now + windowMs };

  if (attempt.resetAt < now) {
    attempt.count = 0;
    attempt.resetAt = now + windowMs;
  }

  attempt.count += 1;
  authAttempts.set(key, attempt);

  if (attempt.count > maxRequests) {
    return res.status(429).json({ message: "Too many requests. Try again soon." });
  }

  next();
};

app.use(securityHeaders);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json({ limit: "10kb" }));

app.use("/api/auth", limitRequests(20, 15 * 60 * 1000));
app.use("/api/payments/pay", limitRequests(10, 15 * 60 * 1000));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/promos", promoRoutes);

app.get("/", (_req, res) => {
  res.send("Backend is running");
});

app.use((error, _req, res, _next) => {
  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "Origin not allowed" });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid id" });
  }

  console.error(error);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
