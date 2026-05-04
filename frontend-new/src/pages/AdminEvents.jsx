import { useEffect, useState } from "react";

export default function AdminEvents() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const data = await res.json();
    setEvents(data);
  };

  const deleteEvent = async (id) => {
    await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
    });
    loadEvents();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">Manage Events</h1>
        <p className="mt-1 text-slate-600">View and delete created events.</p>

        <div className="mt-6 space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col gap-3 rounded-lg bg-white p-5 shadow sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="font-semibold">{event.title}</h2>
                <p className="text-sm text-slate-500">
                  {event.date || "No date"} | {event.location}
                </p>
              </div>

              <button
                onClick={() => deleteEvent(event.id)}
                className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <p className="mt-6 text-slate-500">No events found.</p>
        )}
      </div>
    </div>
  );
}
