import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  let admin = null;

  try {
    admin = JSON.parse(localStorage.getItem("admin"));
  } catch {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
  }

  if (!admin || !localStorage.getItem("adminToken")) {
    return <Navigate to="/admin/login" />;
  }

  return children;
}
