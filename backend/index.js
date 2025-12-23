const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const ticketRoutes = require("./routes/ticketRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/tickets", ticketRoutes);
app.use("/api/events", eventRoutes);

app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server listening on", PORT);
});
