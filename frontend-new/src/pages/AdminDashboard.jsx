import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const loadEvents = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const data = await res.json();
    setEvents(data);
  };

  const loadTickets = async () => {
    const res = await fetch(`${API_URL}/api/tickets`);
    const data = await res.json();
    setTickets(data);
  };

  const loadDashboard = () => {
    loadEvents();
    loadTickets();
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const addEvent = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!title || !date || !location) {
      setMessage("Please fill title, date and location.");
      return;
    }

    const res = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, location, description }),
    });

    if (!res.ok) {
      setMessage("Could not add event.");
      return;
    }

    setTitle("");
    setDate("");
    setLocation("");
    setDescription("");
    setMessage("Event added successfully.");
    loadDashboard();
  };

  const deleteEvent = async (id) => {
    await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
    });

    loadDashboard();
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-slate-600">
            Create events, view bookings and manage your event list.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Total Events</p>
            <p className="mt-2 text-3xl font-bold">{events.length}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Tickets Booked</p>
            <p className="mt-2 text-3xl font-bold">{tickets.length}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Attendees</p>
            <p className="mt-2 text-3xl font-bold">{tickets.length}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <form onSubmit={addEvent} className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">Add Event</h2>

            {message && (
              <p className="mb-3 rounded bg-slate-100 p-2 text-sm text-slate-700">
                {message}
              </p>
            )}

            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              className="mb-3 w-full rounded border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tech Meetup"
            />

            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              className="mb-3 w-full rounded border p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <label className="mb-1 block text-sm font-medium">Location</label>
            <input
              className="mb-3 w-full rounded border p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Bengaluru"
            />

            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              className="mb-4 w-full rounded border p-2"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short event details"
            />

            <button className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">
              Add Event
            </button>
          </form>

          <div className="rounded-lg bg-white p-5 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">All Events</h2>

            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-3 rounded border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-slate-500">
                      {event.date || "No date"} | {event.location}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-sm text-slate-600">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteEvent(event.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              ))}

              {events.length === 0 && (
                <p className="text-slate-500">No events added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-semibold">Recent Tickets</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b">
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
          </div>

          {tickets.length === 0 && (
            <p className="mt-4 text-slate-500">No tickets booked yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
