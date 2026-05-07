import express from "express";
import Event from "../models/Event.js";
import PromoCode from "../models/PromoCode.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { calculateDiscount, findValidPromoCode } from "../utils/promoCodes.js";

const router = express.Router();

router.post("/validate", protect, async (req, res, next) => {
  try {
    const { code, eventId } = req.body;

    if (!code || !eventId) {
      return res.status(400).json({ message: "Promo code and event required" });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const promo = await findValidPromoCode(code);

    if (!promo) {
      return res.status(404).json({ message: "Invalid or expired promo code" });
    }

    res.json({
      valid: true,
      ...calculateDiscount(event.price, promo),
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, adminOnly, async (_req, res, next) => {
  try {
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    res.json(promoCodes);
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, adminOnly, async (req, res, next) => {
  try {
    const promoCode = await PromoCode.create(req.body);
    res.status(201).json(promoCode);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", protect, adminOnly, async (req, res, next) => {
  try {
    const promoCode = await PromoCode.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!promoCode) {
      return res.status(404).json({ message: "Promo code not found" });
    }

    res.json(promoCode);
  } catch (error) {
    next(error);
  }
});

export default router;
