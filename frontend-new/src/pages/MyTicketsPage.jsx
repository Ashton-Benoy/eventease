import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyTicketsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadTickets = async () => {
    setMessage("");

    if (!token) {
      setMessage("Please login to view your tickets.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/tickets/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || data.error || "Could not load tickets.");
        return;
      }

      setTickets(data);

      if (data.length === 0) {
        setMessage("You do not have any tickets yet.");
      }
    } catch {
      setMessage("Could not load tickets. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const deleteTicket = async (ticketId) => {
    setMessage("");

    if (!token) {
      setMessage("Please login to delete a ticket.");
      return;
    }

    const res = await fetch(`${API_URL}/api/tickets/${ticketId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Could not delete ticket.");
      return;
    }

    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    setMessage("Ticket deleted.");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-md rounded bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">Login Required</h1>
          <p className="mt-2 text-slate-600">
            Login to see only your own tickets.
          </p>
          <Link
            to="/login"
            className="mt-4 inline-block rounded bg-indigo-600 px-4 py-2 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900">My Tickets</h1>
        <p className="mt-1 text-slate-600">
          Showing tickets for {user?.email}.
        </p>

        {loading && <p className="mt-4 text-slate-500">Loading tickets...</p>}
        {message && !loading && (
          <p className="mt-4 text-sm text-slate-600">{message}</p>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-lg bg-white p-5 shadow">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {ticket.eventId?.title || "Event Ticket"}
                </h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  {ticket.status || "active"}
                </span>
              </div>

              <p className="text-sm text-slate-600">
                <strong>Name:</strong> {ticket.name}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Email:</strong> {ticket.email}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Location:</strong>{" "}
                {ticket.eventId?.location || "Not available"}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Date:</strong> {ticket.eventId?.date || "Not available"}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Payment:</strong> {ticket.paymentStatus}
              </p>

              <Link
                to={`/tickets/success/${ticket.id}`}
                className="mt-4 inline-block rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                View Ticket
              </Link>

              <button
                onClick={() => deleteTicket(ticket.id)}
                className="ml-3 mt-4 inline-block rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
