// src/pages/TicketSuccess.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TicketSuccess() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/tickets/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || `Server ${res.status}`);
        setTicket(data);
      } catch (err) {
        setError(err.message || err);
      }
    }
    load();
  }, [id]);

  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;
  if (!ticket) return <div className="p-8 text-center">Loading ticket…</div>;

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-2xl font-bold">Reservation confirmed</h2>
        <p className="mt-3 text-gray-600">Ticket ID: <code className="break-words">{ticket.ticketId}</code></p>
        <p className="mt-2">Event: <strong>{ticket.eventId}</strong></p>
        <p className="mt-2">Name: {ticket.name}</p>
        <p className="mt-2 text-sm text-gray-500">Present this ticket ID at the venue to check in.</p>
      </div>
    </div>
  );
}
