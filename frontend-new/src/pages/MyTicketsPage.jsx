// src/pages/MyTicketsPage.jsx
import React, { useState } from "react";

export default function MyTicketsPage() {
  const [email, setEmail] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchTickets(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTickets([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/tickets?email=${encodeURIComponent(email)}`
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch tickets");
      }

      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      {/* Email form */}
      <form onSubmit={fetchTickets} className="flex gap-3 mb-8">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
        >
          {loading ? "Loading..." : "View Tickets"}
        </button>
      </form>

      {error && (
        <div className="text-red-600 mb-4">{error}</div>
      )}

      {/* Tickets */}
      <div className="grid md:grid-cols-2 gap-6">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="font-semibold mb-2">
              Event {t.eventId}
            </h2>

            {t.qrCode && (
              <img
                src={t.qrCode}
                alt="Ticket QR"
                className="w-40 h-40 mx-auto"
              />
            )}

            <div
              className={`mt-3 text-center font-medium ${
                t.checkedIn
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {t.checkedIn ? "Checked in ✅" : "Not checked in"}
            </div>
          </div>
        ))}
      </div>

      {!loading && tickets.length === 0 && !error && (
        <p className="text-gray-500 text-center">
          No tickets found
        </p>
      )}
    </div>
  );
}
