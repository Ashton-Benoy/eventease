const express = require("express");
const router = express.Router();

// TEMP in-memory events (safe starter)
router.get("/", (req, res) => {
  res.json([
    {
      _id: "1",
      title: "Tech Meetup",
      description: "A meetup for developers",
      date: "2025-01-15",
      location: "Online"
    },
    {
      _id: "2",
      title: "Design Workshop",
      description: "Hands-on UI/UX workshop",
      date: "2025-02-01",
      location: "Bangalore"
    }
  ]);
});

module.exports = router;
