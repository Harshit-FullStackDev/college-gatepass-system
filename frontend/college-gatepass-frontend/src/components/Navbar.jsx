import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const hideForAuthPages = ["/login", "/register"].includes(location.pathname);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <Link to="/" className="text-xl font-bold text-green-800 hover:text-green-600">
          College Gatepass
        </Link>
      </div>

      {!hideForAuthPages && currentUser && (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-semibold text-gray-700 capitalize">
            {currentUser.role.toLowerCase()} Dashboard
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
