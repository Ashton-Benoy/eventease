import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function CheckoutPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [event, setEvent] = useState(null);
  const [name, setName] = useState(user?.name || "");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [promoCode, setPromoCode] = useState("");
  const [pricing, setPricing] = useState(null);
  const [promoMessage, setPromoMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingPromo, setCheckingPromo] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setPricing({
          originalAmount: Math.max(Number(data.price || 0), 0) * 100,
          discountAmount: 0,
          finalAmount: Math.max(Number(data.price || 0), 0) * 100,
        });
      })
      .catch(() => setError("Could not load event."));
  }, [API_URL, id]);

  const formatRupees = (amountInPaise = 0) =>
    `Rs. ${(amountInPaise / 100).toFixed(2)}`;

  const applyPromoCode = async () => {
    setError("");
    setPromoMessage("");

    if (!promoCode.trim()) {
      setPricing({
        originalAmount: Math.max(Number(event?.price || 0), 0) * 100,
        discountAmount: 0,
        finalAmount: Math.max(Number(event?.price || 0), 0) * 100,
      });
      return;
    }

    setCheckingPromo(true);

    try {
      const res = await fetch(`${API_URL}/api/promos/validate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id, code: promoCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPromoMessage(data.message || "Promo code could not be applied.");
        return;
      }

      setPricing(data);
      setPromoCode(data.promoCode);
      setPromoMessage(`Promo applied. You saved ${formatRupees(data.discountAmount)}.`);
    } catch {
      setPromoMessage("Could not check promo code.");
    } finally {
      setCheckingPromo(false);
    }
  };

  const submit = async () => {
    setError("");

    if (!user || !token) {
      setError("Please login before buying a ticket.");
      return;
    }

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/payments/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: id,
          name,
          paymentMethod,
          promoCode: promoCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.error || "Could not confirm payment.");
        return;
      }

      localStorage.setItem("ticket", JSON.stringify(data.ticket));
      navigate(`/tickets/success/${data.ticket.id}`);
    } catch {
      setError("Could not connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  if (!user || !token) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">Login Required</h1>
          <p className="mt-2 text-slate-600">
            Only registered users can purchase tickets.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-block rounded bg-indigo-600 px-4 py-2 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Buy Ticket</h1>
        <p className="mt-1 mb-5 text-sm text-slate-600">
          {event?.title || "Event"} | {formatRupees(pricing?.originalAmount)}
        </p>

        <label className="mb-1 block text-sm font-medium">Name</label>
        <input
          className="mb-3 w-full rounded border p-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          className="mb-3 w-full rounded border bg-slate-100 p-2"
          value={user.email}
          disabled
        />

        <label className="mb-1 block text-sm font-medium">Payment Method</label>
        <select
          className="mb-3 w-full rounded border p-2"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option>UPI</option>
          <option>Credit / Debit Card</option>
          <option>Net Banking</option>
          <option>Wallet</option>
        </select>

        <label className="mb-1 block text-sm font-medium">Promo Code</label>
        <div className="mb-2 flex gap-2">
          <input
            className="w-full rounded border p-2 uppercase"
            placeholder="SAVE10"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setPromoMessage("");
            }}
          />
          <button
            type="button"
            onClick={applyPromoCode}
            disabled={checkingPromo}
            className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            {checkingPromo ? "Checking" : "Apply"}
          </button>
        </div>

        {promoMessage && (
          <p className="mb-3 rounded bg-slate-50 p-2 text-sm text-slate-700">
            {promoMessage}
          </p>
        )}

        <div className="mb-3 rounded bg-slate-50 p-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Ticket price</span>
            <span>{formatRupees(pricing?.originalAmount)}</span>
          </div>
          <div className="mt-1 flex justify-between text-green-700">
            <span>Discount</span>
            <span>- {formatRupees(pricing?.discountAmount)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t pt-2 font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatRupees(pricing?.finalAmount)}</span>
          </div>
        </div>

        <p className="mb-3 rounded bg-slate-50 p-2 text-sm text-slate-600">
          Complete your payment to confirm the ticket.
        </p>

        {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

        <button
          type="button"
          onClick={submit}
          disabled={loading}
          className="w-full rounded bg-indigo-600 p-2 font-medium text-white hover:bg-indigo-700"
        >
          {loading ? "Processing..." : "Pay and Confirm Ticket"}
        </button>
      </div>
    </div>
  );
}
