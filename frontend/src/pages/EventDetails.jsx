import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api.js";
import { loadStripe } from '@stripe/stripe-js';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchEvent = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setEvent(res.data);
    } catch (err) {
      console.error("Failed to load event", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!event)
    return (
      <p className="text-center mt-10 text-red-600">
        Event not found or deleted.
      </p>
    );

  const isCreator = user && user._id === event.creator;
  const isAdmin = user && user.role === "admin";

  const deleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await API.delete(`/events/${event._id}`);
      alert("Event deleted");
      navigate("/events");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      <p className="text-gray-700 mt-3">{event.description}</p>

      <p className="mt-4 text-lg">
        📍 <span className="font-semibold">{event.location}</span>
      </p>

      <p className="mt-2 text-lg">
        🗓 {new Date(event.date).toLocaleDateString()}
      </p>

      <div className="flex gap-4 mt-6">
        {/* RSVP Button */}
        <button
          onClick={() => navigate(`/rsvp/${event._id}`)}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          RSVP
        </button>

        {/* Edit button only for creator */}
        {isCreator && (
          <button
            onClick={() => navigate(`/edit/${event._id}`)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </button>
        )}

        {/* Delete button for creator + admin */}
        {(isCreator || isAdmin) && (
          <button
            onClick={deleteEvent}
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
          
        )}
      </div>
    </div>
  );
};

export default EventDetails;
