
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


exports.createPaymentIntent = async (req, res) => {
  const { amount, eventId, ticketType } = req.body;
  const currency = 'usd';
  
  if (!amount || !eventId || !ticketType) {
    return res.status(400).json({ message: 'Missing required payment details.' });
  }
  

  const finalAmount = Math.round(amount);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: currency,
    
      metadata: { 
        userId: req.user._id.toString(), 
        eventId: eventId,
        ticketType: ticketType
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe Payment Error:', error.message);
    res.status(500).json({ 
      message: 'Failed to create payment intent.',
      error: error.message 
    });
  }
};