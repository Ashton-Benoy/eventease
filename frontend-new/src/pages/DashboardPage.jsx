import React, { useEffect, useState } from "react";
import API from "../services/apiService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [myRsvps, setMyRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

    
      const res1 = await API.get("/auth/me");
      setProfile(res1.data.user);

      
      const res2 = await API.get(`/events/my-events/${user._id}`);
      setMyEvents(res2.data);

    
      const res3 = await API.get(`/events/my-rsvps/${user._id}`);
      setMyRsvps(res3.data);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* PROFILE INFO */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Welcome, {profile?.name}</h2>
        <p className="text-gray-700 mb-2">Email: {profile?.email}</p>

        <Link
          to="/profile"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Manage Profile
        </Link>
      </div>

      {/* STAT CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-4xl font-bold text-blue-600">{myEvents.length}</h3>
          <p className="text-gray-600">Events Created</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-4xl font-bold text-green-600">{myRsvps.length}</h3>
          <p className="text-gray-600">RSVPs Submitted</p>
        </div>

        <div className="bg-white p-5 rounded shadow text-center">
          <h3 className="text-4xl font-bold text-purple-600">
            {myEvents.length + myRsvps.length}
          </h3>
          <p className="text-gray-600">Total Activity</p>
        </div>
      </div>

      {/* MY EVENTS SECTION */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-bold">My Events</h3>
          <Link
            to="/create-event"
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Create Event
          </Link>
        </div>

        {myEvents.length === 0 ? (
          <p className="text-gray-500">You haven't created any events yet.</p>
        ) : (
          <ul className="space-y-3">
            {myEvents.map((ev) => (
              <li
                key={ev._id}
                className="p-4 border rounded flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">{ev.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {new Date(ev.date).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/edit/${ev._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* MY RSVPS SECTION */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-bold mb-4">My RSVPs</h3>
        {myRsvps.length === 0 ? (
          <p className="text-gray-500">You haven't RSVPed to any events.</p>
        ) : (
          <ul className="space-y-3">
            {myRsvps.map((ev) => (
              <li key={ev._id} className="p-4 border rounded">
                <h4 className="font-semibold">{ev.title}</h4>
                <p className="text-gray-600 text-sm">
                  {new Date(ev.date).toLocaleDateString()}
                </p>

                <Link
                  to={`/events/${ev._id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Event
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
