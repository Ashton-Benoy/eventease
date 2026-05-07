import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const emptyEvent = {
  title: "",
  date: "",
  location: "",
  price: "",
  description: "",
};

const emptyPromo = {
  code: "",
  percentOff: "",
  amountOff: "",
  maxUses: "",
  expiresAt: "",
};

export default function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;
  const adminToken = localStorage.getItem("adminToken");

  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState(emptyEvent);
  const [promoCodes, setPromoCodes] = useState([]);
  const [promoForm, setPromoForm] = useState(emptyPromo);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const loadEvents = async () => {
    const res = await fetch(`${API_URL}/api/events`);
    const data = await res.json();
    setEvents(Array.isArray(data) ? data : []);
  };

  const loadTickets = async () => {
    const res = await fetch(`${API_URL}/api/tickets`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    setTickets(Array.isArray(data) ? data : []);
  };

  const loadPromoCodes = async () => {
    const res = await fetch(`${API_URL}/api/promos`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    const data = await res.json();
    setPromoCodes(Array.isArray(data) ? data : []);
  };

  const loadDashboard = () => {
    loadEvents();
    loadTickets();
    loadPromoCodes();
  };

  useEffect(() => {
    fetch(`${API_URL}/api/events`)
      .then((res) => res.json())
      .then((data) => setEvents(Array.isArray(data) ? data : []));

    fetch(`${API_URL}/api/tickets`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((data) => setTickets(Array.isArray(data) ? data : []));

    fetch(`${API_URL}/api/promos`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    })
      .then((res) => res.json())
      .then((data) => setPromoCodes(Array.isArray(data) ? data : []));
  }, [API_URL, adminToken]);

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.title || !form.date || !form.location) {
      setMessage("Please fill title, date and location.");
      return;
    }

    const url = editingId
      ? `${API_URL}/api/events/${editingId}`
      : `${API_URL}/api/events`;

    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setMessage("Could not save event. Please login as admin again.");
      return;
    }

    setForm(emptyEvent);
    setEditingId(null);
    setMessage(editingId ? "Event updated." : "Event added.");
    loadDashboard();
  };

  const startEdit = (event) => {
    setEditingId(event.id);
    setForm({
      title: event.title || "",
      date: event.date || "",
      location: event.location || "",
      price: event.price || "",
      description: event.description || "",
    });
    setMessage("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyEvent);
  };

  const deleteEvent = async (id) => {
    await fetch(`${API_URL}/api/events/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    loadDashboard();
  };

  const savePromoCode = async (e) => {
    e.preventDefault();
    setPromoMessage("");

    if (!promoForm.code) {
      setPromoMessage("Enter a promo code.");
      return;
    }

    if (!promoForm.percentOff && !promoForm.amountOff) {
      setPromoMessage("Add a percentage or flat discount.");
      return;
    }

    const payload = {
      code: promoForm.code,
      percentOff: Number(promoForm.percentOff || 0),
      amountOff: Number(promoForm.amountOff || 0),
      maxUses: Number(promoForm.maxUses || 0),
      expiresAt: promoForm.expiresAt || undefined,
    };

    const res = await fetch(`${API_URL}/api/promos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setPromoMessage(data.message || "Could not save promo code.");
      return;
    }

    setPromoForm(emptyPromo);
    setPromoMessage("Promo code added.");
    loadPromoCodes();
  };

  const togglePromoCode = async (promo) => {
    await fetch(`${API_URL}/api/promos/${promo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({ active: !promo.active }),
    });

    loadPromoCodes();
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-slate-600">
            Admin can create, edit and delete events.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Total Events</p>
            <p className="mt-2 text-3xl font-bold">{events.length}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Tickets Booked</p>
            <p className="mt-2 text-3xl font-bold">{tickets.length}</p>
          </div>

          <div className="rounded-lg bg-white p-5 shadow">
            <p className="text-sm text-slate-500">Attendees</p>
            <p className="mt-2 text-3xl font-bold">{tickets.length}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <Link className="rounded bg-slate-900 p-3 text-center text-white" to="/admin/users">
            Manage Users
          </Link>
          <Link className="rounded bg-slate-900 p-3 text-center text-white" to="/admin/tickets">
            Tickets
          </Link>
          <Link className="rounded bg-slate-900 p-3 text-center text-white" to="/admin/payments">
            Demo Payments
          </Link>
          <Link className="rounded bg-slate-900 p-3 text-center text-white" to="/admin/attendees">
            Attendees
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <form onSubmit={saveEvent} className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">
              {editingId ? "Edit Event" : "Add Event"}
            </h2>

            {message && (
              <p className="mb-3 rounded bg-slate-100 p-2 text-sm text-slate-700">
                {message}
              </p>
            )}

            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              className="mb-3 w-full rounded border p-2"
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              placeholder="Tech Meetup"
            />

            <label className="mb-1 block text-sm font-medium">Date</label>
            <input
              type="date"
              className="mb-3 w-full rounded border p-2"
              value={form.date}
              onChange={(e) => updateForm("date", e.target.value)}
            />

            <label className="mb-1 block text-sm font-medium">Location</label>
            <input
              className="mb-3 w-full rounded border p-2"
              value={form.location}
              onChange={(e) => updateForm("location", e.target.value)}
              placeholder="Bengaluru"
            />

            <label className="mb-1 block text-sm font-medium">Price in INR</label>
            <input
              type="number"
              className="mb-3 w-full rounded border p-2"
              value={form.price}
              onChange={(e) => updateForm("price", e.target.value)}
              placeholder="199"
            />

            <label className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              className="mb-4 w-full rounded border p-2"
              rows="3"
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              placeholder="Short event details"
            />

            <button className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">
              {editingId ? "Update Event" : "Add Event"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="mt-2 w-full rounded bg-slate-200 py-2 font-medium"
              >
                Cancel Edit
              </button>
            )}
          </form>

          <div className="rounded-lg bg-white p-5 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">All Events</h2>

            <div className="space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col gap-3 rounded border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-slate-500">
                      {event.date || "No date"} | {event.location} | ₹
                      {event.price || 0}
                    </p>
                    {event.description && (
                      <p className="mt-1 text-sm text-slate-600">
                        {event.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(event)}
                      className="rounded bg-slate-900 px-3 py-2 text-sm text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEvent(event.id)}
                      className="rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {events.length === 0 && (
                <p className="text-slate-500">No events added yet.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white p-5 shadow">
          <h2 className="mb-4 text-xl font-semibold">Recent Tickets</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Event</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b">
                    <td className="p-3">{ticket.name}</td>
                    <td className="p-3">{ticket.email}</td>
                    <td className="p-3">
                      {ticket.eventId?.title || ticket.eventId || "Event"}
                    </td>
                    <td className="p-3">
                      {ticket.checkedIn ? "Checked in" : "Booked"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {tickets.length === 0 && (
            <p className="mt-4 text-slate-500">No tickets booked yet.</p>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <form onSubmit={savePromoCode} className="rounded-lg bg-white p-5 shadow">
            <h2 className="mb-4 text-xl font-semibold">Promo Codes</h2>

            {promoMessage && (
              <p className="mb-3 rounded bg-slate-100 p-2 text-sm text-slate-700">
                {promoMessage}
              </p>
            )}

            <label className="mb-1 block text-sm font-medium">Code</label>
            <input
              className="mb-3 w-full rounded border p-2 uppercase"
              value={promoForm.code}
              onChange={(e) =>
                setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })
              }
              placeholder="SAVE10"
            />

            <label className="mb-1 block text-sm font-medium">Percent Off</label>
            <input
              type="number"
              className="mb-3 w-full rounded border p-2"
              value={promoForm.percentOff}
              onChange={(e) =>
                setPromoForm({ ...promoForm, percentOff: e.target.value })
              }
              placeholder="10"
            />

            <label className="mb-1 block text-sm font-medium">
              Flat Discount in INR
            </label>
            <input
              type="number"
              className="mb-3 w-full rounded border p-2"
              value={promoForm.amountOff}
              onChange={(e) =>
                setPromoForm({ ...promoForm, amountOff: e.target.value })
              }
              placeholder="50"
            />

            <label className="mb-1 block text-sm font-medium">Max Uses</label>
            <input
              type="number"
              className="mb-3 w-full rounded border p-2"
              value={promoForm.maxUses}
              onChange={(e) =>
                setPromoForm({ ...promoForm, maxUses: e.target.value })
              }
              placeholder="0 means unlimited"
            />

            <label className="mb-1 block text-sm font-medium">Expires On</label>
            <input
              type="date"
              className="mb-4 w-full rounded border p-2"
              value={promoForm.expiresAt}
              onChange={(e) =>
                setPromoForm({ ...promoForm, expiresAt: e.target.value })
              }
            />

            <button className="w-full rounded bg-indigo-600 py-2 font-medium text-white hover:bg-indigo-700">
              Add Promo Code
            </button>
          </form>

          <div className="rounded-lg bg-white p-5 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Active Discounts</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b bg-slate-50">
                    <th className="p-3">Code</th>
                    <th className="p-3">Discount</th>
                    <th className="p-3">Uses</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promo) => (
                    <tr key={promo.id} className="border-b">
                      <td className="p-3 font-semibold">{promo.code}</td>
                      <td className="p-3">
                        {promo.percentOff ? `${promo.percentOff}%` : ""}
                        {promo.percentOff && promo.amountOff ? " + " : ""}
                        {promo.amountOff ? `Rs. ${promo.amountOff}` : ""}
                      </td>
                      <td className="p-3">
                        {promo.usedCount || 0}
                        {promo.maxUses ? ` / ${promo.maxUses}` : ""}
                      </td>
                      <td className="p-3">{promo.active ? "Active" : "Paused"}</td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => togglePromoCode(promo)}
                          className="rounded bg-slate-900 px-3 py-1 text-white"
                        >
                          {promo.active ? "Pause" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {promoCodes.length === 0 && (
              <p className="mt-4 text-slate-500">No promo codes added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
