// src/pages/FeaturesPage.jsx
import React from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function FeaturesPage() {
  const features = [
    {
      title: "Event Creation",
      desc: "Create stunning event pages with descriptions, images, pricing, scheduling, and categories.",
    },
    {
      title: "Ticket Sales",
      desc: "Sell tickets securely with multiple payment methods including Stripe integration.",
    },
    {
      title: "QR Code Check-In",
      desc: "Instant QR code generation and verification for quick attendee check-in.",
    },
    {
      title: "Organizer Dashboard",
      desc: "Track sales, attendees, check-ins, and event analytics in one clean dashboard.",
    },
    {
      title: "Email Notifications",
      desc: "Send order confirmations and updates automatically to attendees.",
    },
    {
      title: "User Accounts",
      desc: "Attendees can manage their tickets, profiles, and event history in a personalized space.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 text-center">
        Powerful Features for Your Events
      </h1>
      <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
        Everything you need to create, manage, and grow your events — from ticketing to analytics.
      </p>

      {/* Features List */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-lg transition"
          >
            <CheckCircleIcon className="w-10 h-10 text-indigo-600" />
            <h3 className="text-lg font-semibold mt-4">{f.title}</h3>
            <p className="text-gray-600 mt-2 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg font-medium hover:bg-indigo-700 shadow">
          Start Creating Events
        </button>
      </div>
    </div>
  );
}
