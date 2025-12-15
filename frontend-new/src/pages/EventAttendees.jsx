import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { useParams } from "react-router-dom";

export default function EventAttendees() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    socket.emit("join-event", eventId);

    fetch(`http://localhost:5000/api/tickets/event/${eventId}`)
      .then(res => res.json())
      .then(setAttendees);

    socket.on("attendee-added", ticket => {
      setAttendees(prev => [...prev, ticket]);
    });

    socket.on("attendee-checked-in", updated => {
      setAttendees(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );
    });

    return () => {
      socket.off("attendee-added");
      socket.off("attendee-checked-in");
    };
  }, [eventId]);

  const checkedIn = attendees.filter(a => a.checkedIn).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Event Attendees
        </h1>
        <div className="text-sm text-gray-600">
          Checked in: <b>{checkedIn}</b> / {attendees.length}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        {attendees.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No attendees yet
          </div>
        )}

        {attendees.map(a => (
          <div
            key={a.id}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{a.name}</p>
              <p className="text-sm text-gray-500">{a.email}</p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                a.checkedIn
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {a.checkedIn ? "Checked in" : "Pending"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
