import React, { useEffect, useState } from "react";
import API from "../api";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [rsvpList, setRsvpList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchProfile();
    fetchMyEvents();
    fetchMyRSVPs();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch (err) {
      setErrorMsg("Failed to fetch user profile");
    }
  };

  const fetchMyEvents = async () => {
    try {
      const res = await API.get("/events/my-events");
      setEvents(res.data);
    } catch (err) {
      console.log("Events not loaded");
    }
  };

  const fetchMyRSVPs = async () => {
    try {
      const res = await API.get("/events/my-rsvp");
      setRsvpList(res.data);
    } catch (err) {
      console.log("RSVP data not loaded");
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await API.put("/auth/update", {
        name,
        email,
        password: password || undefined,
      });

      setSuccessMsg("Profile updated successfully!");
      setPassword("");
      fetchProfile();
    } catch (err) {
      setErrorMsg("Profile update failed");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {/* Messages */}
      {successMsg && <p className="text-green-600 font-semibold">{successMsg}</p>}
      {errorMsg && <p className="text-red-500 font-semibold">{errorMsg}</p>}

      <div className="grid md:grid-cols-2 gap-10">

        {/* --- Profile Update Form --- */}
        <div className="bg-white shadow p-6 rounded">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>

          <form onSubmit={updateProfile}>
            <label className="block font-semibold">Name</label>
            <input
              className="w-full border p-2 rounded mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block font-semibold">Email</label>
            <input
              className="w-full border p-2 rounded mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block font-semibold">New Password (optional)</label>
            <input
              className="w-full border p-2 rounded mb-6"
              type="password"
              placeholder="Change password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
              Update Profile
            </button>
          </form>
        </div>

        {/* --- Right Side: Events + RSVPs --- */}
        <div>
          {/* User's created events */}
          <div className="bg-white shadow p-6 rounded mb-8">
            <h2 className="text-xl font-semibold mb-3">My Created Events</h2>
            {events.length === 0 ? (
              <p className="text-gray-500">No events created yet.</p>
            ) : (
              <ul className="list-disc ml-5">
                {events.map((event) => (
                  <li key={event._id} className="mb-1">
                    <a
                      className="text-blue-600 hover:underline"
                      href={`/events/${event._id}`}
                    >
                      {event.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User's RSVPs */}
          <div className="bg-white shadow p-6 rounded">
            <h2 className="text-xl font-semibold mb-3">My RSVPs</h2>
            {rsvpList.length === 0 ? (
              <p className="text-gray-500">No RSVP activity.</p>
            ) : (
              <ul className="list-disc ml-5">
                {rsvpList.map((r) => (
                  <li key={r._id} className="mb-1">
                    <strong>{r.eventTitle}</strong>:{" "}
                    <span className="text-blue-600">{r.response}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
