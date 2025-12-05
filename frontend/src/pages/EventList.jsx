import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    getEvents();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading events...</p>;
  if (!events.length) return <p className="text-center mt-8">No events found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-4">
      {events.map((ev) => (
        <div key={ev._id} className="p-4 border rounded bg-white shadow">
          <h3 className="font-bold text-lg">{ev.title}</h3>
          <p className="text-sm text-gray-600">
            {ev.location} • {new Date(ev.date).toLocaleDateString()}
          </p>
          <p className="mt-2 text-gray-700">{ev.description?.slice(0, 120)}...</p>

          <div className="mt-3 flex gap-2">
            <Link
              to={`/events/${ev._id}`}
              className="text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
