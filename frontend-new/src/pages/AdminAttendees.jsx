import { useEffect, useState } from "react";

export default function AdminAttendees() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/tickets`)
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch(() => setTickets([]));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Attendees</h1>
        <p className="mt-1 text-slate-600">
          Each booked ticket is counted as one attendee.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="rounded-lg bg-white p-5 shadow">
              <h2 className="font-semibold">{ticket.name}</h2>
              <p className="text-sm text-slate-600">{ticket.email}</p>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Event:</strong>{" "}
                {ticket.eventId?.title || ticket.eventId || "Event"}
              </p>
              <p className="mt-1 text-sm text-green-700">
                {ticket.checkedIn ? "Checked in" : "Booked"}
              </p>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <p className="mt-6 text-slate-500">No attendees found.</p>
        )}
      </div>
    </div>
  );
}
