// client\src\components\NavBar.jsx

import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../context/AuthContext";
import useAuth from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-4 shadow">
      <Link to="/" className="text-2xl font-extrabold text-blue-600">
        E-Learning
      </Link>

      <div className="flex items-center gap-4">

        <Link to="/" className="hidden md:inline text-gray-700 hover:text-blue-600">
          Home
        </Link>

        <Link to="/courses" className="hidden md:inline text-gray-700 hover:text-blue-600">
          Courses
        </Link>

        {user?.role === "instructor" && (
          <Link
            to="/instructor/dashboard"
            className="hidden md:inline text-gray-700 hover:text-blue-600"
          >
            Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="rounded border border-blue-600 px-4 py-1 text-sm text-blue-600 hover:bg-blue-50"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="rounded bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600"
          >
            Logout ({user.name})
          </button>
        )}
      </div>
    </nav>
  );
}
