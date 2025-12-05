import React, { useEffect, useState } from "react";
import API from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Load from local storage first (instant display)
  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) {
      const parsed = JSON.parse(u);
      setUser(parsed);
      setForm({ name: parsed.name, email: parsed.email });
    }
    fetchProfile();
  }, []);

  // Fetch real profile from backend
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/auth/me");
      setUser(res.data.user);
      setForm({
        name: res.data.user.name,
        email: res.data.user.email,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error(err);
      setMsg("Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async () => {
    try {
      setLoading(true);
      const res = await API.put("/auth/update-profile", form);

      setMsg("Profile updated successfully!");
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setEditing(false);
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      {msg && <p className="p-2 bg-blue-100 text-blue-700 rounded mb-3">{msg}</p>}

      {/* VIEW MODE */}
      {!editing && (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit Profile
            </button>

            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <button
            onClick={fetchProfile}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editing && (
        <div>
          <input
            className="w-full p-2 border rounded mb-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="w-full p-2 border rounded mb-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
          />

          <div className="mt-3 flex gap-3">
            <button
              onClick={updateProfile}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
