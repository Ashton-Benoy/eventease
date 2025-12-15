// src/pages/EventsPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/events`
        );

        if (!res.ok) throw new Error("Unable to load events");

        const data = await res.json();
        setEvents(data || []);
      } catch (err) {
        console.error(err);
        setError("Events are unavailable right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Browse events</h1>
        <p className="text-gray-600 mt-2">
          Discover upcoming events and reserve your seat.
        </p>
      </div>

      {/* TOOLBAR */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search events…"
          className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500"
        />
        <select className="px-4 py-2 rounded-lg border">
          <option>All categories</option>
          <option>Tech</option>
          <option>Design</option>
          <option>Business</option>
        </select>
      </div>

      {/* CONTENT */}
      {loading && (
        <div className="text-center text-gray-500 py-20">
          Loading events…
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-20">
          <p className="text-red-600 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">
            Please try again later.
          </p>
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg font-medium">No events yet</p>
          <p className="text-gray-500 mt-2">
            Check back soon for new events.
          </p>
        </div>
      )}

      {!loading && !error && events.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="rounded-xl border bg-white p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg">
                {event.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {event.date || "Date TBA"} · {event.location || "Online"}
              </p>

              <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                {event.description || "No description available."}
              </p>

              <div className="mt-5 flex justify-between items-center">
                <span className="text-indigo-600 font-semibold">
                  Free
                </span>
                <Link
                  to={`/events/${event._id}`}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
