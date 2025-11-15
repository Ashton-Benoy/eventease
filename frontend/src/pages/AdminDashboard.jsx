import React, { useEffect, useState } from "react";
import API from "../api";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const usersRes = await API.get("/admin/users");
      const eventsRes = await API.get("/admin/events");

      setUsers(usersRes.data);
      setEvents(eventsRes.data);

      setLoading(false);
    } catch (err) {
      setMsg("Failed to load admin dashboard.");
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await API.delete(`/admin/users/${id}`);
      setMsg("User deleted successfully");
      loadData();
    } catch (err) {
      setMsg("Failed to delete user");
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event permanently?")) return;

    try {
      await API.delete(`/admin/events/${id}`);
      setMsg("Event deleted successfully");
      loadData();
    } catch (err) {
      setMsg("Failed to delete event");
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {msg && <p className="mb-4 text-blue-600 font-semibold">{msg}</p>}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-2xl font-bold">{users.length}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-2xl font-bold">{events.length}</h2>
          <p className="text-gray-600">Total Events</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow p-6 rounded mb-10">
        <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => deleteUser(u._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Events Table */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Manage Events</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Created By</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b">
                <td className="p-2">{event.title}</td>
                <td className="p-2">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-2">{event.createdBy?.name}</td>
                <td className="p-2">
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => deleteEvent(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
