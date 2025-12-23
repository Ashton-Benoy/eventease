const express = require("express");
const {
  createTicket,
  getTicketById
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", createTicket);
router.get("/:id", getTicketById);

module.exports = router;
