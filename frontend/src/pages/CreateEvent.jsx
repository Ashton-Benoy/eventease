import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    seats: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await API.post("/events", form);

      alert("Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.log(err);
      setErrorMsg(err.response?.data?.message || "Event creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Event</h2>

      {errorMsg && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-3">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />

        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Ticket Price"
            className="w-1/2 p-2 border rounded mb-3"
          />

          <input
            name="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            placeholder="Available Seats"
            className="w-1/2 p-2 border rounded mb-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
