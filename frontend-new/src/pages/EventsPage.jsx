import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        console.log("EVENTS:", data); 
        setEvents(data);
      });
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">🎉 Events</h1>

      {events.length === 0 && (
        <p className="text-gray-500">No events available</p>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow"
          >
            <h2 className="text-lg font-semibold">{event.title}</h2>

            <p className="text-sm text-gray-500 mb-3">
              {event.date} • {event.location}
            </p>

            <button
              onClick={() => navigate(`/events/${event.id}`)}
              className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              View Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
