// src/pages/EventDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const EVENTS = {
  "1": { id: "1", title: "Tech Meetup", date: "Dec 18, 2025", location: "Bengaluru", description: "Community tech meetup with talks and networking." },
  "2": { id: "2", title: "Design Workshop", date: "Jan 10, 2026", location: "Mumbai", description: "Hands-on workshop on product design." },
  "3": { id: "3", title: "Music Fest", date: "Apr 20, 2026", location: "Goa", description: "A sunny open-air music festival." },
};

export default function EventDetailPage(){
  const { id } = useParams();
  const nav = useNavigate();
  const event = EVENTS[id];

  if (!event) return <div className="p-12">Event not found.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl p-8 shadow">
        <h1 className="text-2xl font-bold">{event.title}</h1>
        <p className="text-sm text-gray-500 mt-2">{event.date} • {event.location}</p>
        <p className="mt-4 text-gray-700">{event.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={() => nav(`/checkout/${id}`)} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Buy Ticket</button>
          <button onClick={() => nav("/events")} className="px-4 py-2 rounded-lg border">Back to Events</button>
        </div>
      </div>
    </div>
  );
}
