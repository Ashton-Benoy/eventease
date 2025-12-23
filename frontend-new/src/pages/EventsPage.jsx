import EventCard from "../components/EventCard";
import { events } from "../data/events";

export default function EventsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 grid gap-6 grid-cols-1 md:grid-cols-3">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
