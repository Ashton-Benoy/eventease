import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

/* User pages */
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import CheckoutPage from "./pages/CheckoutPage";
import TicketSuccess from "./pages/TicketSuccess";

/* Admin & tools */
import DashboardPage from "./pages/DashboardPage";
import ScannerPage from "./pages/ScannerPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      
      {/* NAVBAR — render ONCE */}
      <Navbar />

      {/* ROUTES — render ONCE */}
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
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Optional admin dashboard shortcut */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <DashboardPage />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
}
