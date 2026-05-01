import express from "express";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});