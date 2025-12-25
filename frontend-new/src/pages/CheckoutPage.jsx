
import { Link } from "react-router-dom";


import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleBuy(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const api = import.meta.env.VITE_API_URL || "http://localhost:5000";

      const res = await fetch(`${api}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: id,
          name,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to reserve ticket");
      }

      navigate(`/tickets/success/${data.ticketId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-2">Buy Ticket</h1>
      <p className="text-gray-600 mb-6">Event ID: {id}</p>

      <form onSubmit={handleBuy} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Reserving ticket…" : "Confirm Ticket"}
        </button>
      </form>
    </div>
  );
}
