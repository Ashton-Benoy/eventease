import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";
import RSVPPage from "./pages/RSVPPage";
import AdminDashboard from "./pages/AdminDashboard";
import SearchEvents from "./pages/SearchEvents";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-16"> {/* Prevent overlap with navbar */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/search" element={<SearchEvents />} />

          {/* Protected Routes */}
          <Route
            path="/create-event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* RSVP */}
          <Route
            path="/rsvp/:id"
            element={
              <ProtectedRoute>
                <RSVPPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
