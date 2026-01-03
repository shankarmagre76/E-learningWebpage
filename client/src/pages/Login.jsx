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
  const { login } = useAuth();

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser(form);
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

          {/* Header */}
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <i className="fas fa-right-to-bracket text-blue-600"></i>
            Login
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <i className="fas fa-graduation-cap"></i>
            Welcome back! Continue your learning journey.
          </p>

          {/* Email */}
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <i className="fas fa-envelope text-gray-500"></i>
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:border-blue-500 outline-none"
          />

          {/* Password */}
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <i className="fas fa-lock text-gray-500"></i>
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm focus:border-blue-500 outline-none"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-sign-in-alt"}`}></i>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="inline-flex items-center gap-1 text-blue-600 hover:underline">
              <i className="fas fa-user-plus"></i>
              Register
            </Link>
          </p>

        </form>
      </div>
    </MainLayout>
  );
}
