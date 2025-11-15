import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/api";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data.event);
    } catch (err) {
      console.error("Error fetching event:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Loading event details...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Event not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded-xl">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

        <p className="text-gray-600 text-lg mb-4">{event.description}</p>

        <div className="space-y-2 mb-6">
          <p className="text-gray-800">
            📅 <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-gray-800">
            🕒 <strong>Time:</strong> {event.time}
          </p>
          <p className="text-gray-800">
            📍 <strong>Location:</strong> {event.location}
          </p>
          <p className="text-gray-800">
            👥 <strong>Max Participants:</strong> {event.capacity}
          </p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            RSVP
          </button>

          <Link
            to={`/events/${event._id}/edit`}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit
          </Link>

          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Delete
          </button>
        </div>

        <Link
          to="/events"
          className="block mt-6 text-blue-600 hover:underline"
        >
          ← Back to Events
        </Link>
      </div>
    </div>
  );
};

export default EventDetails;
<Link to={`/events/edit/${event._id}`}>
  <button className="bg-yellow-500 px-3 py-1 rounded text-white">
    Edit
  </button>
</Link>
