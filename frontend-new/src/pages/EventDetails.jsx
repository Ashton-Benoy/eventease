// src/pages/EventDetails.jsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import api from "../services/apiService";
import { Link } from "react-router-dom";


export default function EventDetails({ event }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6">{event.description}</p>

      <div className="flex gap-3">
        <Link
          to={`/checkout/${event.id}`}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Buy Ticket
        </Link>

        {/* 🔥 NEW */}
        <Link
          to={`/events/${event.id}/attendees`}
          className="px-5 py-2 bg-gray-900 text-white rounded-lg"
        >
          Live Attendees
        </Link>
      </div>
    </div>
  );
}
export default function EventDetails() {
  const { id } = useParams();
  const { data: event, isLoading } = useQuery({
    queryKey: ["event", id],
    queryFn: () => api.getEvent(id),
    enabled: !!id,
  });

  if (isLoading) return <Container className="py-20 text-center">Loading…</Container>;
  if (!event) return <Container className="py-20 text-center text-red-600">Event not found</Container>;

  return (
    <Container className="py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{event.title}</h1>
          <div className="text-gray-500 mt-2">{new Date(event.startAt).toLocaleString()} · {event.location}</div>
        </div>

        <Card>
          <h3 className="font-semibold mb-2">About this event</h3>
          <p className="text-gray-700">{event.description}</p>
        </Card>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <h4 className="font-semibold">Organizer</h4>
            <div className="text-sm text-gray-600 mt-1">{event.organizerName || "Organizer"}</div>
          </Card>

          <Card>
            <h4 className="font-semibold">Venue</h4>
            <div className="text-sm text-gray-600 mt-1">{event.location}</div>
          </Card>
        </div>
      </div>

      <aside>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Tickets</div>
              <div className="font-semibold text-lg">{event.tickets?.length || 0} options</div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {event.tickets?.map((t) => (
              <div key={t._id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.quantity ? `${t.quantity} left` : "Unlimited"}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${(t.priceCents/100).toFixed(2)}</div>
                  <Button className="mt-2" onClick={() => alert("Implement buy flow")}>Buy</Button>
                </div>
              </div>
            ))}

            {!event.tickets?.length && <div className="text-sm text-gray-500">No tickets available</div>}
          </div>
        </Card>

        <Card className="mt-4">
          <div className="text-sm text-gray-500">Need help?</div>
          <div className="mt-2 text-sm">Contact: <a className="text-indigo-600" href={`mailto:${process.env.VITE_SUPPORT_EMAIL || "support@example.com"}`}>{process.env.VITE_SUPPORT_EMAIL || "support@example.com"}</a></div>
        </Card>
      </aside>
    </Container>
  );
}
<Link
  to={`/events/${event.id}/checkin`}
  className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
  Scan Tickets
</Link>