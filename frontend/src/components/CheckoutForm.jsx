// src/components/CheckoutForm.jsx
import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// Assuming your service file is at:
import apiService from '../services/apiService'; 

// Example data structure, replace with your actual props/state
const DUMMY_TICKET_DATA = { 
  amount: 2500, // Amount in cents ($25.00)
  eventId: 'evt_12345',
  ticketType: 'General Admission'
};

const CheckoutForm = ({ eventId, ticketType, ticketPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: Get Client Secret from Backend on load
  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        // You need to send the necessary data (amount, eventId) to your backend
        const response = await apiService('/payments/create-payment-intent', {
          method: 'POST',
          // Assuming your service attaches the JWT token
          body: JSON.stringify({
            amount: DUMMY_TICKET_DATA.amount,
            eventId: DUMMY_TICKET_DATA.eventId,
            ticketType: DUMMY_TICKET_DATA.ticketType,
          }),
        });

        if (response && response.clientSecret) {
          setClientSecret(response.clientSecret);
        } else {
          setMessage("Could not initiate payment. Check server.");
        }
      } catch (error) {
        setMessage(`Error fetching secret: ${error.message}`);
      }
    };
    fetchClientSecret();
  }, []);

  // STEP 2: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }
    
    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // Redirect the user back to a success page after payment
        return_url: `${window.location.origin}/payment-success`, 
      },
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setMessage("Payment Succeeded!");
      // Handle post-payment logic: issue ticket, update database, etc.
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
      {/* Stripe injects the payment form fields here */}
      {clientSecret && <PaymentElement id="payment-element" />}

      <button 
        disabled={isLoading || !stripe || !elements || !clientSecret} 
        id="submit"
        className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md disabled:opacity-50"
      >
        <span id="button-text">
          {isLoading ? "Processing..." : "Pay Now"}
        </span>
      </button>

      {/* Show error messages or success status */}
      {message && <div id="payment-message" className="mt-3 text-red-600 text-sm">{message}</div>}
    </form>
  );
};

export default CheckoutForm;