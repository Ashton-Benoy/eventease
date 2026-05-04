import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketSuccess() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tickets/${id}`);
        const data = await res.json();

        if (res.ok) {
          setTicket(data);
          localStorage.setItem("ticket", JSON.stringify(data));
        } else {
          setTicket(JSON.parse(localStorage.getItem("ticket")));
        }
      } catch {
        setTicket(JSON.parse(localStorage.getItem("ticket")));
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, [API_URL, id]);

  if (loading) {
    return <p className="mt-10 text-center">Loading ticket...</p>;
  }

  if (!ticket) {
    return <p className="mt-10 text-center">Ticket not found.</p>;
  }

  const eventTitle = ticket.eventId?.title || "Event Ticket";
  const eventDate = ticket.eventId?.date || "Not available";
  const eventLocation = ticket.eventId?.location || "Not available";
  const qrValue = JSON.stringify({
    ticketId: ticket.id || id,
    eventId: ticket.eventId?.id || ticket.eventId,
    email: ticket.email,
  });

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 text-center shadow">
        <p className="text-sm font-medium text-green-700">Ticket Confirmed</p>
        <h1 className="mt-2 text-2xl font-bold">{eventTitle}</h1>

        <div className="mt-5 space-y-2 text-left text-sm text-slate-700">
          <p>
            <strong>Name:</strong> {ticket.name}
          </p>
          <p>
            <strong>Email:</strong> {ticket.email}
          </p>
          <p>
            <strong>Date:</strong> {eventDate}
          </p>
          <p>
            <strong>Location:</strong> {eventLocation}
          </p>
          <p>
            <strong>Ticket ID:</strong> {ticket.id || id}
          </p>
        </div>

        <div className="my-6 flex justify-center">
          <QRCodeCanvas value={qrValue} size={180} />
        </div>

        <p className="text-sm text-slate-500">
          Show this QR code at the event entrance.
        </p>

        <Link
          to="/my-tickets"
          className="mt-5 inline-block rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Go to My Tickets
        </Link>
      </div>
    </div>
  );
}
