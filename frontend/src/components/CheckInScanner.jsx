import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import API from "../services/api";

export default function CheckInScanner({ onCheckedIn }) {
  const regionId = "html5qr-checkin-region";
  const html5QrcodeRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | scanning | scanned | success | error
  const [lastScanned, setLastScanned] = useState(null);

  useEffect(() => {
    const start = async () => {
      try {
        setStatus("scanning");
        const html5QrCode = new Html5Qrcode(regionId);
        html5QrcodeRef.current = html5QrCode;

        const config = { fps: 10, qrbox: { width: 300, height: 300 } };

        await html5QrCode.start(
          { facingMode: "environment" },
          config,
          async (decodedText /* decodedResult */) => {
            // Prevent scanning same payload repeatedly
            if (decodedText === lastScanned) {
              return;
            }
            setLastScanned(decodedText);
            setStatus("scanned");

            // expected payload format: ticketId|buyerEmail|eventId
            const [ticketId] = decodedText.split("|");

            try {
              const resp = await API.checkinTicket({ ticketId });
              setStatus("success");
              if (onCheckedIn) onCheckedIn(resp);
              // show success for 2s then resume scanning
              setTimeout(async () => {
                setStatus("scanning");
                setLastScanned(null);
              }, 2000);
            } catch (err) {
              console.error("Check-in failed:", err);
              setStatus("error");
              // show error for 2s then resume scanning
              setTimeout(() => {
                setStatus("scanning");
                setLastScanned(null);
              }, 2000);
            }
          },
          (errorMessage) => {
            // scanner decode error callback — do not spam console
          }
        );
      } catch (err) {
        console.error("Unable to start scanner:", err);
        setStatus("error");
      }
    };

    start();

    return () => {
      (async () => {
        try {
          if (html5QrcodeRef.current) {
            await html5QrcodeRef.current.stop();
            html5QrcodeRef.current.clear();
          }
        } catch (e) {
          // ignore cleanup errors
        }
      })();
    };
  }, [onCheckedIn, lastScanned]);

  return (
    <div className="max-w-xl mx-auto">
      <div id={regionId} style={{ width: "100%" }} />
      <div className="mt-3 text-sm">
        <div>Status: <span className="font-medium">{status}</span></div>
        {status === "success" && <div className="text-green-600">Checked in successfully ✅</div>}
        {status === "error" && <div className="text-red-600">Check-in failed — ticket not found or already checked-in</div>}
        {status === "scanned" && <div className="text-gray-600">Processing scan...</div>}
      </div>
      <div className="mt-3 text-xs text-gray-500">
        Tip: Scan a ticket QR. Expected QR payload format: <code>ticketId|buyerEmail|eventId</code>
      </div>
    </div>
  );
}
