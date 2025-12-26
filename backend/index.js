import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import ticketRoutes from "./routes/ticketRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
