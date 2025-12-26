import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function TicketSuccess() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/tickets/${id}`)
      .then(res => res.json())
      .then(setTicket);
  }, [id]);

  if (!ticket) {
    return <p className="text-center mt-10">Loading ticket...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-slate-900 p-6 rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">🎟 Ticket Confirmed</h1>

      <p className="mb-1"><strong>Name:</strong> {ticket.name}</p>
      <p className="mb-1"><strong>Email:</strong> {ticket.email}</p>
      <p className="mb-4"><strong>Event ID:</strong> {ticket.eventId}</p>

      <div className="flex justify-center my-4">
        <QRCodeCanvas
          value={JSON.stringify(ticket)}
          size={180}
        />
      </div>

      <p className="text-sm text-gray-500">
        Show this QR code at the event entrance
      </p>
    </div>
  );
}
