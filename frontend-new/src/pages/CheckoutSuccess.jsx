// src/pages/CheckoutSuccess.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function CheckoutSuccess() {
  const [params] = useSearchParams();
  const pid = params.get("pid");
  const event = params.get("event");

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-2xl font-bold">Payment successful</h2>
        <p className="mt-3 text-gray-600">Payment ID: <code className="break-words">{pid}</code></p>
        <p className="mt-2">Thanks for booking <strong>{event}</strong> — your ticket will arrive by email shortly.</p>
      </div>
    </div>
  );
}
