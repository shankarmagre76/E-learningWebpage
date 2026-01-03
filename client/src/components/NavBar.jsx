// client/src/components/NavBar.jsx

import { Link, useNavigate } from "react-router-dom";
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

      {/* Logo */}
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold text-blue-600"
      >
        <img
          src="/learn.png"
          alt="E-Learning Logo"
          className="h-15 w-15 object-contain"
        />
      </Link>


      <div className="flex items-center gap-6">

        <Link
          to="/"
          className="hidden md:flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <i className="fas fa-home"></i>
          Home
        </Link>

        <Link
          to="/courses"
          className="hidden md:flex items-center gap-1 text-gray-700 hover:text-blue-600"
        >
          <i className="fas fa-book-open"></i>
          Courses
        </Link>

        {user?.role === "instructor" && (
          <Link
            to="/instructor/dashboard"
            className="hidden md:flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            <i className="fas fa-chalkboard-teacher"></i>
            Dashboard
          </Link>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 rounded border border-blue-600 px-4 py-1 text-sm text-blue-600 hover:bg-blue-50"
            >
              <i className="fas fa-sign-in-alt"></i>
              Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-1 rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
            >
              <i className="fas fa-user-plus"></i>
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded bg-red-500 px-4 py-1 text-sm text-white hover:bg-red-600"
          >
            <i className="fas fa-sign-out-alt"></i>
            Logout ({user.name})
          </button>
        )}
      </div>
    </nav>
  );
}
