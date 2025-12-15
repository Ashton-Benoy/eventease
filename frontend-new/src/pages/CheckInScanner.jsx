import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function CheckInScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const data = JSON.parse(decodedText);

          await fetch(`http://localhost:5000/api/tickets/${data.ticketId}/checkin`, {
            method: "POST",
          });

          alert("✅ Ticket checked in!");
        } catch {
          alert("❌ Invalid QR code");
        }
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4 text-center">
        Scan Ticket QR
      </h1>
      <div id="qr-reader" />
    </div>
  );
}
