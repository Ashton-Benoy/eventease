import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import CheckIn from "./pages/CheckIn";
import Dashboard from "./pages/Dashboard";
import RSVPPage from "./pages/RSVPPage";
import Features from "./pages/Features";


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventsList />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/rsvp/:id" element={<RSVPPage />} />
          <Route path="/checkin" element={<CheckIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          {/* fallback */}
          <Route path="*" element={<div className="p-8 text-center">Page not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
