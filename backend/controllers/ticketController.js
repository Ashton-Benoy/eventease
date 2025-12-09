// controllers/ticketController.js
const Ticket = require('../models/Ticket');
const qrCode = require('qrcode');
const { v4: uuidv4 } = require('uuid'); // Install uuid if you haven't: npm install uuid

// @desc    Generate a new ticket and its QR code data
// @route   POST /api/v1/tickets/generate
// @access  Protected
exports.generateTicket = async (req, res) => {
  // This logic runs AFTER payment is confirmed (e.g., from a webhook or success endpoint)
  const { eventId, ticketType, price } = req.body;
  const userId = req.user._id; // Attached by authMiddleware

  try {
    // 1. Create unique QR Code Data (e.g., a UUID string)
    const uniqueTicketId = uuidv4(); 

    // 2. Create the ticket document in the database
    const ticket = await Ticket.create({
      user: userId,
      event: eventId,
      ticketType,
      price,
      qrCodeData: uniqueTicketId,
      status: 'Paid',
    });

    // 3. Generate the QR Code image as a data URL
    const qrCodeImage = await qrCode.toDataURL(uniqueTicketId);

    res.status(201).json({
      message: 'Ticket successfully generated',
      ticket: ticket,
      qrCodeImage: qrCodeImage, // Send the image data back to the frontend
    });

  } catch (error) {
    res.status(500).json({ message: 'Ticket generation failed', error: error.message });
  }
};

// @desc    Check-in an attendee using QR Code data
// @route   POST /api/v1/tickets/checkin
// @access  Protected (Organizer Only)
exports.checkInAttendee = async (req, res) => {
  const { qrCodeData } = req.body;

  try {
    const ticket = await Ticket.findOne({ qrCodeData });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }
    if (ticket.status === 'CheckedIn') {
      return res.status(400).json({ message: 'Ticket already checked in.' });
    }

    // Update status and record check-in time
    ticket.status = 'CheckedIn';
    ticket.checkedInAt = new Date();
    await ticket.save();

    res.json({ 
      message: 'Attendee successfully checked in.', 
      ticketId: ticket._id,
      attendeeName: (await ticket.populate('user')).user.name // Example of populating user info
    });

  } catch (error) {
    res.status(500).json({ message: 'Check-in failed.', error: error.message });
  }
};