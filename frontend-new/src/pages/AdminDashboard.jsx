import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const loadEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(setEvents);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const addEvent = async () => {
    await fetch("http://localhost:5000/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, date, location }),
    });

    setTitle("");
    setDate("");
    setLocation("");
    loadEvents();
  };

  const deleteEvent = async (id) => {
    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
    });
    loadEvents();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Dashboard</h1>

      {/* ADD EVENT */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-3">Add Event</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 w-full mb-2"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <button
          onClick={addEvent}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Event
        </button>
      </div>

      {/* EVENTS LIST */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded shadow">
        <h2 className="font-semibold mb-3">All Events</h2>

        {events.map(event => (
          <div
            key={event.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-500">
                {event.date} • {event.location}
              </p>
            </div>

            <button
              onClick={() => deleteEvent(event.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}

        {events.length === 0 && (
          <p className="text-gray-500">No events available</p>
        )}
      </div>
    </div>
  );
}
