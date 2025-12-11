import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth(); // ✔ Get logged-in user

  return (
    <MainLayout>
      <section className="mx-auto max-w-5xl rounded-2xl bg-white px-6 py-16 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 md:text-5xl">
          Learn <span className="text-blue-600">Modern Skills</span> for Free
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600">
          Join interactive courses, track your progress, and upskill at your own
          pace.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {/* Always visible */}
          <Link
            to="/courses"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Browse Courses
          </Link>

          {/* Conditionally show Get Started or Dashboard */}
          {!user ? (
            <Link
              to="/register"
              className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50"
            >
              Get Started
            </Link>
          ) : user.role === "instructor" ? (
            <Link
              to="/instructor/dashboard"
              className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/dashboard"
              className="rounded-lg border border-blue-600 px-6 py-3 text-blue-600 hover:bg-blue-50"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
