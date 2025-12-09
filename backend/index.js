require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const paymentRoutes = require('./routes/paymentRoutes');
const app = express();
const ticketRoutes = require('./routes/ticketRoutes');
const eventRoutes = require('./routes/eventRoutes');

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
app.use(express.json());


const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    const mongoUrl = process.env.MONGODB_URL || process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGODB_URL is not set in .env");


    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected");


    app.use("/api/events", require(path.join(__dirname, "routes", "eventRoutes")));
    app.use('/api/v1/events', eventRoutes);

app.use('/api/v1/tickets', ticketRoutes);
    app.get("/api/health", (req, res) => res.json({ ok: true }));
    app.use('/api/v1/payments', paymentRoutes);
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
