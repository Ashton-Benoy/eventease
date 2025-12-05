import React from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../hooks/useEvents";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function EventsList() {
  const nav = useNavigate();
  const { data: events, isLoading, isError } = useEvents();

  if (isLoading) {
    return (
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </Container>
    );
  }

  if (isError) {
    return <Container className="py-20 text-center">Unable to load events. Try again later.</Container>;
  }

  return (
    <Container className="py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Upcoming events</h2>
        <Button onClick={() => nav("/admin/create-event")}>Create event</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events?.map(ev => (
          <Card key={ev._id} className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold">{ev.title}</h3>
              <p className="text-sm text-gray-500">{new Date(ev.startAt).toLocaleString()}</p>
              <p className="mt-2 text-sm text-gray-700 line-clamp-3">{ev.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Button onClick={() => nav(`/events/${ev._id}`)} variant="ghost">View</Button>
              <div className="text-xs text-gray-400">ID #{String(ev._id).slice(0,6)}</div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}
