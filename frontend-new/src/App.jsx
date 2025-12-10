// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout + Components
import Header from "./components/Header";

// Pages
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import FeaturesPage from "./pages/FeaturesPage";
import EventDetailPage from "./pages/EventDetailPage";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import TicketSuccess from "./pages/TicketSuccess";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* ---------- HEADER ---------- */}
      <Header />

      {/* ---------- ROUTES ---------- */}
      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Event system */}
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

         

          {/* Features */}
          <Route path="/features" element={<FeaturesPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Organizer dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/tickets/success/:id" element={<TicketSuccess />} />
        </Routes>
      </main>
    </div>
  );
}
