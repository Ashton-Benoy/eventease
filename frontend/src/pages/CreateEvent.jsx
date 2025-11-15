import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/events", formData);
      alert("Event created successfully!");
      navigate("/events");
    } catch (err) {
      console.log(err);
      alert("Failed to create event");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Create Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="font-semibold">Event Title</label>
            <input
              type="text"
              name="title"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              name="description"
              className="w-full border p-2 rounded"
              rows="3"
              onChange={handleChange}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="font-semibold">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-semibold">Time</label>
            <input
              type="time"
              name="time"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold">Location</label>
            <input
              type="text"
              name="location"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Capacity */}
          <div>
            <label className="font-semibold">Capacity</label>
            <input
              type="number"
              name="capacity"
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
