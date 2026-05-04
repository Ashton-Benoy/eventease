import { useEffect, useState } from "react";

export default function AdminTickets() {
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
        <h1 className="text-3xl font-bold">Sold Tickets</h1>
        <p className="mt-1 text-slate-600">All tickets booked by users.</p>

        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Event</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-t">
                  <td className="p-3">{ticket.name}</td>
                  <td className="p-3">{ticket.email}</td>
                  <td className="p-3">
                    {ticket.eventId?.title || ticket.eventId || "Event"}
                  </td>
                  <td className="p-3">
                    {ticket.checkedIn ? "Checked in" : "Booked"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tickets.length === 0 && (
            <p className="p-5 text-slate-500">No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
