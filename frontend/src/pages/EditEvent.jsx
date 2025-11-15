import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("Error loading event");
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/events/${id}`, formData);
      alert("Event updated successfully!");
      navigate("/events");
    } catch (err) {
      console.log(err);
      alert("Failed to update event");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-xl">
        <h1 className="text-3xl font-bold mb-4">Edit Event</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Title */}
          <div>
            <label className="font-semibold">Event Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              value={formData.description}
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
              value={formData.date?.substring(0, 10)}
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
              value={formData.time}
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
              value={formData.location}
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
              value={formData.capacity}
              className="w-full border p-2 rounded"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
