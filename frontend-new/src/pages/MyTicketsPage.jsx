import { Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function MyTicketsPage() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="p-10 text-center text-red-500">
        Please log in to view your tickets
      </div>
    );
  }

  if (!user.tickets || user.tickets.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold mb-4">No tickets found</h2>
        <Link to="/events" className="text-blue-500 underline">
          Browse events
        </Link>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">My Tickets</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {user.tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow"
          >
            <h2 className="text-lg font-semibold">{ticket.event}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {ticket.date}
            </p>

            <div className="mt-4 flex justify-center">
              <QRCodeCanvas
                value={ticket.id}
                size={140}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>

            <p className="text-center text-sm mt-2 text-gray-400">
              Ticket ID: {ticket.id}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
