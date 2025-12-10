// src/pages/EventsPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const EVENTS = [
  { id: "1", title: "Tech Meetup", date: "Dec 18, 2025", location: "Bengaluru", description: "Community tech meetup" },
  { id: "2", title: "Design Workshop", date: "Jan 10, 2026", location: "Mumbai", description: "Hands-on design workshop" },
  { id: "3", title: "Music Fest", date: "Apr 20, 2026", location: "Goa", description: "Open-air music festival" },
];

export default function EventsPage(){
  const nav = useNavigate();

  async function reserve(evId) {
    try {
      // simple static user info for now; use auth in future
      const payload = { eventId: evId, name: "Guest", email: "" };
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || `Server returned ${res.status}`);
      // navigate to success page with ticket id
      nav(`/tickets/success/${data.ticketId}`);
    } catch (err) {
      alert("Failed to reserve ticket: " + (err.message || err));
      console.error(err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Upcoming events</h2>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.map(ev => (
          <div key={ev.id}>
            <EventCard {...ev} onDetails={() => nav(`/events/${ev.id}`)} onBuy={() => reserve(ev.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
