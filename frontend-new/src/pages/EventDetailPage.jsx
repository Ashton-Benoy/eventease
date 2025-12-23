import { useParams } from "react-router-dom";
import { events } from "../data/events";

export default function EventDetailPage() {
  const { id } = useParams();

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="p-6 text-red-500">
        Event not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">
        {event.title}
      </h1>

      <p className="text-slate-600 dark:text-slate-400 mb-4">
        {event.date} · {event.time} · {event.location}
      </p>

      <p className="mb-6 dark:text-slate-300">
        {event.description}
      </p>

      <a
        href={`/checkout/${event.id}`}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Reserve Ticket
      </a>
    </div>
  );
}
