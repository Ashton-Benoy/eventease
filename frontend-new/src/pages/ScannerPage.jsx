import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScannerPage() {
  const scannerRef = useRef(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const { ticketId } = JSON.parse(decodedText);

          const res = await fetch(
            `http://localhost:5000/api/tickets/${ticketId}/checkin`,
            { method: "POST" }
          );

          const data = await res.json();
          if (!res.ok) throw new Error(data.error);

          setMessage("✅ Ticket checked in successfully");
        } catch {
          setMessage("❌ Invalid or already used ticket");
        }
      },
      () => {}
    );

    scannerRef.current = scanner;

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">QR Code Check-In</h1>

      <div id="qr-reader" className="rounded overflow-hidden" />

      {message && (
        <p className="mt-4 text-lg font-medium text-center">{message}</p>
      )}
    </div>
  );
}
