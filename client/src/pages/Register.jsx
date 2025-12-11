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
          <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
          <p className="mt-1 text-sm text-gray-500">
            Join the platform and start learning or teaching.
          </p>

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            type="text"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <label className="mt-4 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            onChange={onChange}
            className="mt-1 w-full rounded border px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <label className="mt-4 block text-sm font-medium text-gray-700">
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

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
}
