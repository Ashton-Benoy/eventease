import React from "react";
import { Routes, Route } from "react-router-dom";


import Header from "./components/Header";
import MyTicketsPage from "./pages/MyTicketsPage";

import CheckInScanner from "./pages/CheckInScanner";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import FeaturesPage from "./pages/FeaturesPage";
import EventDetailPage from "./pages/EventDetailPage";
import ReservePage from "./pages/CheckoutPage"; 
import CheckoutPage from "./pages/CheckoutPage";
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

         
          <Route path="/checkout/:id" element={<ReservePage />} />  
          {/* Features */}
          <Route path="/features" element={<FeaturesPage />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />

          {/* Organizer dashboard */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/events/:eventId/checkin" element={<CheckInScanner />}/>
          <Route path="/signup" element={<SignupPage />} /> 
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/tickets/success/:id" element={<TicketSuccess />} />
        </Routes>
      </main>
    </div>
  );
}
