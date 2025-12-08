import React from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import CheckInScanner from "../components/CheckInScanner";

export default function CheckIn() {
  const handleCheckedIn = (ticket) => {
    // you can show a toast or push to a logs list
    console.log("Checked in ticket:", ticket);
  };

  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <h2 className="text-2xl font-semibold">Event Check-in</h2>
          <p className="text-sm text-gray-500 mt-1">Point the camera at attendee QR codes to mark them as checked in.</p>
        </Card>

        <Card>
          <CheckInScanner onCheckedIn={handleCheckedIn} />
        </Card>
      </div>
    </Container>
  );
}
