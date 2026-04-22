import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root test
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ CONNECT EVENTS ROUTE
app.use("/api/events", eventRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});