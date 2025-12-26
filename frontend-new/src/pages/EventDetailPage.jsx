import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        console.log("ALL EVENTS:", data);
        console.log("LOOKING FOR ID:", id);

        const found = data.find(e => String(e.id) === String(id));

        if (!found) {
          setEvent(null);
        } else {
          setEvent(found);
        }

        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-10 text-center">Loading event…</div>;
  }

  if (!event) {
    return (
      <div className="p-10 text-center text-red-500">
        ❌ Event not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-slate-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

      <p className="text-gray-500 mb-4">
        {event.date} • {event.location}
      </p>

      <p className="mb-6">{event.description || "No description provided."}</p>

      <button
        onClick={() => navigate(`/checkout/${event.id}`)}
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
      >
        Buy Ticket
      </button>
    </div>
  );
}
