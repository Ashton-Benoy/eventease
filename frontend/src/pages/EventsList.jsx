import React from "react";
import { useQuery } from "@tanstack/react-query";

import { Link } from "react-router-dom";
import Container from "../components/Container";
import Card from "../components/Card";
  



export default function EventsList() {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ["events"],
    queryFn: API.getEvents,
    staleTime: 1000 * 30,
    retry: 1
  });

  if (isLoading) return <Container className="py-20 text-center">Loading events...</Container>;
  if (isError) return <Container className="py-20 text-center text-red-600">Failed to load events</Container>;

  return (
    <Container className="py-10">
      <h1 className="text-2xl font-bold mb-6">Upcoming Events</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((ev) => (
          <Card key={ev._id} className="p-4 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{ev.title}</h3>
            <p className="text-gray-600 text-sm mt-1">{new Date(ev.startAt).toLocaleString()}</p>

            <Link
              to={`/events/${ev._id}`}
              className="inline-block mt-3 text-indigo-600 font-medium hover:underline"
            >
              View Details →
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}
