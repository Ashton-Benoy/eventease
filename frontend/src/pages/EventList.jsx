import React, { useEffect, useState } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";


const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events on load
  const fetchEvents = async () => {
    try {
      const res = await API.get("/events");
      setEvents(res.data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-lg">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>

        <Link
          to="/create-event"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create Event
        </Link>
      </div>

      {/* If no events */}
      {events.length === 0 && (
        <p className="text-gray-600 text-lg text-center mt-20">
          No events found. Create one!
        </p>
      )}

      {/* Event Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
            <p className="text-gray-600 mb-2">{event.description}</p>

            <p className="text-gray-500 text-sm">
              📅 Date: {new Date(event.date).toLocaleDateString()}
            </p>

            <p className="text-gray-500 text-sm">📍 Venue: {event.location}</p>

            <Link
              to={`/events/${event._id}`}
              className="mt-4 block px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
<Link to="/events/create">
  <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
    + Create Event
  </button>
</Link>
