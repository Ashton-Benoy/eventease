import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import TicketSuccess from "./pages/TicketSuccess";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import ScannerPage from "./pages/ScannerPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEvents from "./pages/AdminEvents";
import AdminTickets from "./pages/AdminTickets";
import AdminAttendees from "./pages/AdminAttendees";
import AdminUsers from "./pages/AdminUsers";
import AdminPayments from "./pages/AdminPayments";
import AdminRoute from "./components/AdminRoute";
import Dashboard from "./pages/DashboardPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">

      
      <Navbar />

      {/* Routes */}
      <Routes>

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/tickets/success/:id" element={<TicketSuccess />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* User */}
        <Route path="/my-tickets" element={<MyTicketsPage />} />

        {/* Tools */}
        <Route path="/scanner" element={<ScannerPage />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <AdminEvents />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/tickets"
          element={
            <AdminRoute>
              <AdminTickets />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/attendees"
          element={
            <AdminRoute>
              <AdminAttendees />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminPayments />
            </AdminRoute>
          }
        />

        
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </div>
  );
}
