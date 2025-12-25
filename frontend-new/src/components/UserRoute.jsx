import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../hooks/useUserAuth";

export default function UserRoute({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
