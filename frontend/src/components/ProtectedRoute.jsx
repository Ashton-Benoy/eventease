import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  // If no user, redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
