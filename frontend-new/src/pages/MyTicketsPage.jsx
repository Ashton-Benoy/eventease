// src/pages/MyTicketsPage.jsx
import { useState } from "react";

export default function MyTicketsPage() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  async function handleViewTicket() {
    setError("");
    setTicket(null);

    if (!ticketId) {
      setError("Please enter a ticket ID");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/tickets/${ticketId}`
      );

      if (!res.ok) {
        throw new Error("Ticket not found");
      }

      const data = await res.json();
      setTicket(data);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">My Ticket</h1>

      <input
        type="text"
        placeholder="Enter Ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        className="w-full border rounded px-4 py-2 mb-4"
      />

      <button
        onClick={handleViewTicket}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        View Ticket
      </button>

      {error && (
        <p className="text-red-600 mt-4">{error}</p>
      )}

      {ticket && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p><strong>Ticket ID:</strong> {ticket.ticketId}</p>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Event ID:</strong> {ticket.eventId}</p>
        </div>
      )}
    </div>
  );
}
