import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const RSVPPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Load event + user data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setMsg("Failed to load event.");
      }
    };

    // If user is logged in, autofill their name
    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      setName(u.name);
    } else {
      setMsg("You must be logged in to RSVP.");
    }

    fetchEvent();
  }, [id]);

  const handleRSVP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        setMsg("Please log in first.");
        return navigate("/login");
      }

      await API.post(`/events/${id}/rsvp`, {
        userId: user._id,
        name,
      });

      setMsg("RSVP Successful!");
      setTimeout(() => navigate(`/events/${id}`), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "RSVP failed");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">RSVP for: {event.title}</h2>

      <p className="text-gray-600 mb-4">
        📍 {event.location} <br />
        🗓 {new Date(event.date).toLocaleDateString()}
      </p>

      {msg && <p className="p-2 bg-blue-100 text-blue-700 rounded mb-3">{msg}</p>}

      <form onSubmit={handleRSVP}>
        <label className="block mb-1 font-medium">Your Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
};

export default RSVPPage;
