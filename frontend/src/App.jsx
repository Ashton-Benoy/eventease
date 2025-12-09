import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import RSVPPage from "./pages/RSVPPage";
import Home from "./pages/Home";
import Features from "./pages/Features";
import FeatureDetail from "./pages/FeatureDetail";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rsvp/:id" element={<RSVPPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
