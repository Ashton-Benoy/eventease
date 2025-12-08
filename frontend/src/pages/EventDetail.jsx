import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import API from "../services/api";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";



const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

let stripePromise = null;
if (publishableKey && (isLocalhost || (typeof window !== "undefined" && window.location.protocol === "https:"))) {
  stripePromise = loadStripe(publishableKey);
} else {
  console.warn("Stripe disabled for this session (missing key, non-HTTPS, or blocked).");
}

export default function EventDetail() {
  const { id } = useParams();
  const [buying, setBuying] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { name: "", email: "" }
  });

const { data: event, isLoading, isError } = useQuery({
  queryKey: ["event", id],
  queryFn: () => API.getEvent(id),
  enabled: !!id,          
  retry: 1,
  staleTime: 1000 * 30
});

  const onRSVP = async (values) => {
    try {
      await API.rsvpEvent(id, { name: values.name, email: values.email, guests: 0 });
      toast.success("RSVP recorded — check your email (if enabled).");
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Unable to record RSVP. Try again.");
    }
  };

 const handleBuy = async (ticketType) => {
  const name = document.getElementById("buyerName")?.value;
  const email = document.getElementById("buyerEmail")?.value;
  if (!name || !email) {
    toast.error("Please enter your name and a valid email above.");
    return;
  }

  try {
    setBuying(true);


    const { sessionId } = await API.createCheckout(id, {
      priceCents: ticketType.priceCents,
      ticketTypeName: ticketType.name,
      buyerName: name,
      buyerEmail: email
    });

    
    if (!stripePromise) {
      
      if (!publishableKey) {
        toast.info("Stripe not configured (no publishable key). Simulating successful purchase.");
      } else if (!isLocalhost && window.location.protocol !== "https:") {
        toast.warn("Stripe requires HTTPS for live mode. Use HTTPS or test in localhost.");
      } else {
        toast.warn("Stripe script blocked by browser extension. Try disabling adblocker for localhost.");
      }

     
      console.log("Mock checkout sessionId:", sessionId);
      toast.success("Mock purchase complete — backend ticket created (if webhook simulated).");
      setBuying(false);
      return;
    }

    // Normal Stripe flow
    const stripe = await stripePromise;
    if (!stripe) {
      toast.error("Stripe failed to initialize.");
      setBuying(false);
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });
    if (error) {
      console.error(error);
      toast.error("Stripe checkout failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to create checkout session.");
  } finally {
    setBuying(false);
  }
};


  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <div className="h-6 bg-gray-100 animate-pulse rounded mb-3" />
            <div className="h-4 bg-gray-100 animate-pulse rounded w-1/2 mb-2" />
            <div className="h-40 bg-gray-100 animate-pulse rounded" />
          </Card>
        </div>
      </Container>
    );
  }

  if (isError || !event) {
    return <Container className="py-20 text-center text-red-600">Event not found or failed to load.</Container>;
  }

  return (
    <Container className="py-12">
      <ToastContainer position="top-right" />
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">{event.title}</h1>
              <p className="text-sm text-gray-500 mt-1">{new Date(event.startAt).toLocaleString()} · {event.location || "TBA"}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-gray-500">Starts</div>
                <div className="font-semibold">{new Date(event.startAt).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-gray-700 prose">
            {/* event description rendered safely */}
            <p>{event.description}</p>
          </div>
        </Card>

        {/* Two-column area: left = RSVP & details, right = tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <h3 className="text-lg font-semibold mb-2">About this event</h3>
              <p className="text-sm text-gray-700">{event.description}</p>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold mb-4">RSVP</h3>
              <form onSubmit={handleSubmit(onRSVP)} className="space-y-3">
                <div>
                  <label className="text-sm text-gray-700">Name</label>
                  <input id="rsvpName" {...register("name", { required: "Name is required" })} className="w-full p-2 border rounded" />
                  {errors.name && <div className="text-sm text-red-600 mt-1">{errors.name.message}</div>}
                </div>

                <div>
                  <label className="text-sm text-gray-700">Email</label>
                  <input id="rsvpEmail" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} className="w-full p-2 border rounded" />
                  {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email.message}</div>}
                </div>

                <div className="flex items-center gap-3">
                  <Button type="submit">Submit RSVP</Button>
                  <Button type="button" variant="ghost" onClick={() => { reset(); }}>Clear</Button>
                </div>
              </form>
            </Card>

            {/* Organizer / location / timeline block */}
            <Card>
              <h4 className="font-semibold">Details</h4>
              <ul className="mt-2 text-sm text-gray-700 list-disc list-inside space-y-1">
                <li><strong>Location:</strong> {event.location || "TBA"}</li>
                <li><strong>Start:</strong> {new Date(event.startAt).toLocaleString()}</li>
                <li><strong>End:</strong> {event.endAt ? new Date(event.endAt).toLocaleString() : "—"}</li>
              </ul>
            </Card>
          </div>

          {/* Tickets column */}
          <div className="space-y-4">
            <Card>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Tickets</h3>
                <div className="text-sm text-gray-500">{event.tickets?.length ?? 0} options</div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="mb-3">
                  <label className="block text-sm text-gray-600 mb-1">Buyer name</label>
                  <input id="buyerName" className="w-full p-2 border rounded" placeholder="Your full name" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm text-gray-600 mb-1">Buyer email</label>
                  <input id="buyerEmail" className="w-full p-2 border rounded" placeholder="you@example.com" />
                </div>

                {(!event.tickets || event.tickets.length === 0) && <div className="text-sm text-gray-600">No tickets available for this event.</div>}

                {event.tickets?.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded">
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-xs text-gray-500">{(t.quantity - (t.sold || 0))} left</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-semibold">${(t.priceCents / 100).toFixed(2)}</div>
                      <Button onClick={() => handleBuy(t)} disabled={buying}>{buying ? "Processing…" : "Buy"}</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick contact / support */}
            <Card>
              <h4 className="font-semibold">Need help?</h4>
              <p className="text-sm text-gray-600 mt-2">If you have questions about tickets or accessibility, email <a className="text-indigo-600" href={`mailto:${process.env.VITE_SUPPORT_EMAIL || "support@example.com"}`}>{process.env.VITE_SUPPORT_EMAIL || "support@example.com"}</a></p>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
