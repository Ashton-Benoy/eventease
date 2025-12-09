
/*
export default App;import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import CheckIn from "./pages/CheckIn";

import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';

*/

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import CheckIn from "./pages/CheckIn";

import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <Routes>
      {/* 1. PUBLIC ROUTES (Accessible to everyone) */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} /> 
      
      {/* Route for viewing an individual event detail page */}
      <Route path="/events/:id" element={<EventDetail />} /> 

      {/* 2. PRIVATE ROUTES (Protected by the wrapper) */}
      <Route element={<ProtectedRoute />}>
        {/* All routes inside this group require authentication */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Organizer Event Creation Route */}
        <Route path="/events/create" element={<CreateEvent />} /> 
        
        {/* Add more private routes here, e.g., /profile */}
      </Route>

      {/* 3. FALLBACK ROUTE */}
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
