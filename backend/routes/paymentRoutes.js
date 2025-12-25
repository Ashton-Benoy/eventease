
import express from "express"; 
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET); 


router.post("/create-payment-intent", async (req, res) => {
  try {
   
    const { amountCents, currency = "usd", metadata = {} } = req.body;

    if (!amountCents || amountCents <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency,
      automatic_payment_methods: { enabled: true }, 
      metadata,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err) {
    console.error("PaymentIntent error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
