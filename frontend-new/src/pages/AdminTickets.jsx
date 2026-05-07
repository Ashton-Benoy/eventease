import { useEffect, useState } from "react";

export default function AdminTickets() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [message, setMessage] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  const loadTickets = async () => {
    const res = await fetch(`${API_URL}/api/tickets`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    setTickets(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const saveTicket = async (e) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch(`${API_URL}/api/tickets/${editingTicket.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(editingTicket),
    });

    if (!res.ok) {
      setMessage("Could not update ticket.");
      return;
    }

    setEditingTicket(null);
    setMessage("Ticket updated.");
    loadTickets();
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Tickets</h1>
        <p className="mt-1 text-slate-600">
          Admin can edit ticket owner, check-in and status.
        </p>

        {message && <p className="mt-4 text-sm text-slate-700">{message}</p>}

        {editingTicket && (
          <form onSubmit={saveTicket} className="mt-6 rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">Edit Ticket</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded border p-2"
                value={editingTicket.name}
                onChange={(e) =>
                  setEditingTicket({ ...editingTicket, name: e.target.value })
                }
                placeholder="Name"
              />

              <input
                className="rounded border p-2"
                value={editingTicket.email}
                onChange={(e) =>
                  setEditingTicket({ ...editingTicket, email: e.target.value })
                }
                placeholder="Email"
              />

              <select
                className="rounded border p-2"
                value={editingTicket.status}
                onChange={(e) =>
                  setEditingTicket({ ...editingTicket, status: e.target.value })
                }
              >
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(editingTicket.checkedIn)}
                  onChange={(e) =>
                    setEditingTicket({
                      ...editingTicket,
                      checkedIn: e.target.checked,
                    })
                  }
                />
                Checked in
              </label>
            </div>

            <div className="mt-4 flex gap-3">
              <button className="rounded bg-indigo-600 px-4 py-2 text-white">
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingTicket(null)}
                className="rounded bg-slate-200 px-4 py-2"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Event</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
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
                  <td className="p-3">{ticket.paymentStatus}</td>
                  <td className="p-3">
                    {ticket.status} / {ticket.checkedIn ? "Checked in" : "Booked"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setEditingTicket(ticket)}
                      className="rounded bg-slate-900 px-3 py-1 text-white"
                    >
                      Edit
                    </button>
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
