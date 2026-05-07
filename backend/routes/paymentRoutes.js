import express from "express";
import QRCode from "qrcode";
import Event from "../models/Event.js";
import Payment from "../models/Payment.js";
import Ticket from "../models/Ticket.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  calculateDiscount,
  findValidPromoCode,
  usePromoCode,
} from "../utils/promoCodes.js";

const router = express.Router();

const completePayment = async (req, res, next) => {
  try {
    const { eventId, name, paymentMethod = "UPI", promoCode = "" } = req.body;

    if (!eventId || !name) {
      return res.status(400).json({ message: "Event and name are required" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const promo = await findValidPromoCode(promoCode);

    if (promoCode && !promo) {
      return res.status(400).json({ message: "Invalid or expired promo code" });
    }

    const { originalAmount, discountAmount, finalAmount } = calculateDiscount(
      event.price,
      promo
    );

    const ticket = await Ticket.create({
      name,
      email: req.user.email,
      eventId,
      userId: req.user.id,
      paymentStatus: finalAmount > 0 ? "paid" : "not_required",
      originalAmount,
      discountAmount,
      finalAmount,
      promoCode: promo?.code || "",
    });

    const payment = await Payment.create({
      userId: req.user.id,
      ticketId: ticket._id,
      eventId,
      name,
      email: req.user.email,
      amount: finalAmount,
      originalAmount,
      discountAmount,
      promoCode: promo?.code || "",
      status: "paid",
      razorpayOrderId: `order_${Date.now()}`,
      razorpayPaymentId: `pay_${Date.now()}`,
      razorpaySignature: paymentMethod,
    });

    const qrCode = await QRCode.toDataURL(
      JSON.stringify({ ticketId: ticket.id, eventId: event.id })
    );

    ticket.paymentId = payment._id;
    ticket.qrCode = qrCode;
    await ticket.save();
    await usePromoCode(promo);

    res.status(201).json({
      message: "Payment successful",
      ticket,
      payment,
      pricing: { originalAmount, discountAmount, finalAmount },
    });
  } catch (error) {
    next(error);
  }
};

router.post("/pay", protect, completePayment);

router.get("/", protect, adminOnly, async (_req, res, next) => {
  try {
    const payments = await Payment.find()
      .populate("eventId")
      .populate("ticketId")
      .populate("userId")
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    next(error);
  }
});

export default router;
