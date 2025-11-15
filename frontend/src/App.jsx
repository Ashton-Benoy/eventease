import ProtectedRoute from "./components/ProtectedRoute";

<Routes>
  {/* Public pages */}
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/events" element={<EventList />} />
  <Route path="/events/:id" element={<EventDetails />} />

  {/* Protected */}
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

  {/* Admin-only */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  {/* RSVP page */}
  <Route
    path="/rsvp/:id"
    element={
      <ProtectedRoute>
        <RSVPPage />
      </ProtectedRoute>
    }
  />
</Routes>
