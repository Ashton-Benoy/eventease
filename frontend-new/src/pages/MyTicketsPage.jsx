import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyTicketsPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [tickets, setTickets] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const savedEmail = localStorage.getItem("userEmail");
    const currentEmail = user?.email || savedEmail || "";

    setEmail(currentEmail);

    if (currentEmail) {
      loadTickets(currentEmail);
    }
  }, []);

  const loadTickets = async (emailToSearch = email) => {
    setMessage("");

    if (!emailToSearch) {
      setMessage("Enter your email to see your tickets.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/tickets/user/${emailToSearch}`);
      const data = await res.json();
      setTickets(data);

      if (data.length === 0) {
        setMessage("No tickets found for this email.");
      }
    } catch {
      setMessage("Could not load tickets. Please check the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-slate-900">My Tickets</h1>
        <p className="mt-1 text-slate-600">
          Search with your email and view all tickets you booked.
        </p>

        <div className="mt-6 rounded-lg bg-white p-5 shadow">
          <label className="mb-2 block text-sm font-medium">
            Email address
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              className="flex-1 rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <button
              onClick={() => loadTickets()}
              className="rounded bg-indigo-600 px-5 py-2 font-medium text-white hover:bg-indigo-700"
            >
              Show Tickets
            </button>
          </div>

          {loading && <p className="mt-4 text-slate-500">Loading tickets...</p>}
          {message && !loading && (
            <p className="mt-4 text-sm text-slate-600">{message}</p>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-lg bg-white p-5 shadow">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">
                  {ticket.eventId?.title || "Event Ticket"}
                </h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Booked
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

              <Link
                to={`/tickets/success/${ticket.id}`}
                className="mt-4 inline-block rounded bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
              >
                View Ticket
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
