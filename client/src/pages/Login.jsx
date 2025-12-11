// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { loginUser } from "../services/authService";
import useAuth from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();  // ✔ from context

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);

      // ✔ Save user + token to context
      login(res.user, res.token);

      if (res.user.role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center">
        <form
          onSubmit={onSubmit}
          className="mt-10 w-full max-w-md rounded-xl bg-white p-6 shadow"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Continue your learning journey.
          </p>

          <label className="mt-4 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:border-blue-500"
          />

          <label className="mt-4 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            onChange={onChange}
            className="mt-1 w-full border rounded px-3 py-2 text-sm focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}
