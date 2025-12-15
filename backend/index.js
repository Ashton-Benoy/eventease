import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";

import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("join-event", (eventId) => {
    socket.join(`event-${eventId}`);
    console.log(`Socket joined event-${eventId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

export { io };

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


// TEMP in-memory events (no DB yet)
const events = [
  {
    id: "1",
    title: "Tech Meetup",
    description: "A meetup for developers",
    date: "2025-02-10",
    category: "Technology",
    location: "Bangalore",
  },
  {
    id: "2",
    title: "Design Workshop",
    description: "Hands-on UI/UX workshop",
    date: "2025-03-05",
    category: "Design",
    location: "Online",
  },
];

// Get all events
app.get("/api/events", (req, res) => {
  res.json(events);
});
app.get("/api/events/:id", (req, res) => {
  const { id } = req.params;

  const event = events.find((e) => e.id === id);

  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }

  res.json(event);
});