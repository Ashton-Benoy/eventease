import { useNavigate } from "react-router-dom";

export default function LogoutButton({ role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (role === "admin") {
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } else {
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
