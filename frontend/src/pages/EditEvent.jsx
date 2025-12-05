import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: 0,
    seats: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // Load event data
  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        const ev = res.data;

        setForm({
          title: ev.title,
          description: ev.description,
          location: ev.location,
          date: ev.date?.substring(0, 10), // fix date for input
          price: ev.price,
          seats: ev.seats,
        });
      } catch (err) {
        console.error(err);
        setMsg("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await API.put(`/events/${id}`, form);
      setMsg("Event updated successfully!");
      setTimeout(() => navigate(`/events/${id}`), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading event...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>

      {msg && (
        <p className="mb-3 p-2 bg-blue-100 text-blue-700 rounded">{msg}</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded mb-3"
          required
        />

        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex gap-3">
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-1/2 p-2 border rounded mb-3"
          />
          <input
            name="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            placeholder="Seats"
            className="w-1/2 p-2 border rounded mb-3"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
