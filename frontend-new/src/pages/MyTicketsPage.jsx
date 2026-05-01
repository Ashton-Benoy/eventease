import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyTicketsPage() {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ticket"));
    setTicket(saved);
  }, []);

  if (!ticket) {
    return <p className="text-center mt-10">No tickets found</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">🎟 My Tickets</h1>

      <div className="bg-white p-4 rounded shadow">
        <p><strong>Event ID:</strong> {ticket.eventId}</p>
        <p><strong>Name:</strong> {ticket.name}</p>
        <p><strong>Email:</strong> {ticket.email}</p>

        <Link
          to={`/tickets/success/${ticket.eventId}`}
          className="text-blue-600 mt-3 inline-block"
        >
          View Ticket →
        </Link>
      </div>
    </div>
  );
}