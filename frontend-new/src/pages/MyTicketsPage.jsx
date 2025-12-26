import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!email) return;

    fetch(`http://localhost:5000/api/tickets/user/${email}`)
      .then(res => res.json())
      .then(setTickets);
  }, [email]);

  if (!email) {
    return (
      <p className="text-center mt-10 text-red-500">
        Please login to view your tickets
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">🎟 My Tickets</h1>

      {tickets.length === 0 && (
        <p className="text-gray-500">No tickets found.</p>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white dark:bg-slate-900 p-4 rounded shadow"
          >
            <h3 className="font-semibold">Event ID: {ticket.eventId}</h3>
            <p>Name: {ticket.name}</p>
            <p>Email: {ticket.email}</p>

            <Link
              to={`/tickets/success/${ticket.id}`}
              className="text-indigo-600 text-sm mt-2 inline-block"
            >
              View Ticket →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
