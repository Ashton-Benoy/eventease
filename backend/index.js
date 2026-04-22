import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ THIS LINE IS CRITICAL
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});