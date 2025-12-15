// src/pages/HomePage.jsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Manage events, sell tickets, and check attendees —
            <span className="text-indigo-600"> all in one place.</span>
          </h1>

          <p className="mt-5 text-lg text-gray-600 max-w-xl">
            EventEase is a modern event management platform for organizers and
            attendees. Create events, manage registrations, and simplify check-ins.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/events"
              className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Browse Events
            </Link>

            <Link
              to="/features"
              className="px-6 py-3 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 transition"
            >
              See Features
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE MOCK CARD (NOT GIANT BLOCK) */}
        <div className="hidden md:block">
          <div className="rounded-2xl border bg-white shadow-sm p-6 space-y-3">
            <span className="text-xs font-medium text-indigo-600 uppercase">
              Featured Event
            </span>
            <h3 className="text-xl font-semibold">Tech Meetup 2025</h3>
            <p className="text-sm text-gray-600">
              Bengaluru · Dec 15 · 6:30 PM
            </p>
            <Link
              to="/events"
              className="inline-block w-full text-center rounded-md bg-indigo-600 text-white py-2 hover:bg-indigo-700"
            >
              View Event
            </Link>
          </div>
        </div>
      </section>

      {/* EVENTS PREVIEW */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Upcoming events</h2>
          <Link to="/events" className="text-indigo-600 font-medium">
            View all →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Tech Meetup", date: "Dec 15", location: "Bengaluru" },
            { title: "Design Workshop", date: "Dec 18", location: "Online" },
            { title: "Startup Pitch Night", date: "Dec 22", location: "Mumbai" },
          ].map((event, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white p-5 hover:shadow-md transition"
            >
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {event.date} · {event.location}
              </p>
              <Link
                to="/events"
                className="mt-4 inline-block text-indigo-600 font-medium"
              >
                View details →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
