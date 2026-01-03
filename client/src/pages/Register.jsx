// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (e) {
      alert(e.response?.data?.message || "Registration failed");
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
            <i className="fas fa-user-plus text-green-600"></i>
            Create Account
          </h2>
          <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
            <i className="fas fa-graduation-cap"></i>
            Join the platform and start learning or teaching.
          </p>

          {/* Name */}
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <i className="fas fa-user text-gray-500"></i>
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

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
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
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
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          {/* Role */}
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-gray-700">
            <i className="fas fa-user-tag text-gray-500"></i>
            Select Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-user-check"}`}></i>
            {loading ? "Creating account..." : "Register"}
          </button>

          {/* Login */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              <i className="fas fa-right-to-bracket"></i>
              Login
            </Link>
          </p>

        </form>
      </div>
    </MainLayout>
  );
}
