import { Routes, Route } from "react-router-dom";

/* imports */
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
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <Routes>
      {/* Public */}
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
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Optional */}
      <Route
        path="/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}