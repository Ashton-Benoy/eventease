import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import API from "../services/api";

export default function RSVPPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        // fetch event; fallback to mock if API not available
        const ev = await (API.getEvent ? API.getEvent(id) : Promise.resolve({
          _id: id,
          title: `Sample Event #${id}`,
          date: "2025-12-20",
          description: "This is a demo event."
        }));
        if (mounted) setEvent(ev);
      } catch (err) {
        console.error("Failed to load event", err);
        if (mounted) setEvent(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [id]);

  const handleRSVP = async () => {
    if (!name || !email) {
      alert("Please enter name and email to RSVP.");
      return;
    }
    try {
      await (API.rsvpEvent ? API.rsvpEvent(id, { name, email, guests: 0 }) : Promise.resolve());
      alert("RSVP recorded. Thank you!");
      // optionally navigate back or to a success screen
      // nav("/events");
    } catch (err) {
      console.error(err);
      alert("Failed to record RSVP. Try again.");
    }
  };

  if (loading) return <Container><div className="py-20 text-center">Loading...</div></Container>;
  if (!event) return <Container><div className="py-20 text-center text-red-600">Event not found</div></Container>;

  return (
    <Container>
      <div className="max-w-2xl mx-auto">
        <Card>
          <h2 className="text-2xl font-semibold">{event.title}</h2>
          <p className="text-gray-500">{event.date ?? new Date(event.startAt).toLocaleString()}</p>
          <p className="mt-4 text-sm text-gray-700">{event.description}</p>

          <div className="mt-6">
            <h3 className="font-medium mb-2">RSVP</h3>
            <div className="grid gap-3">
              <input
                className="p-2 border rounded"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="p-2 border rounded"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="flex gap-3">
                <Button onClick={handleRSVP}>Submit RSVP</Button>
                <Button className="bg-gray-200 text-gray-800" onClick={() => nav(-1)}>Back</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
}
