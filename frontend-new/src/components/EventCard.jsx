import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="rounded-xl border p-4 bg-white dark:bg-slate-900">
      <h3 className="font-semibold text-slate-900 dark:text-slate-100">
        {event.title}
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        {event.date} · {event.location}
      </p>

      <Link
        to={`/events/${event.id}`}
        className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 inline-block"
      >
        View details →
      </Link>
    </div>
  );
}
