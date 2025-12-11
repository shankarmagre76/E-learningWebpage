import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getInstructorCourses } from "../services/courseService";

import { getMyCourses } from "../services/courseService";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getMyCourses()
      .then((res) => setEnrollments(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-800">
        Welcome, {user?.name}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Continue your learning journey.
      </p>

      <h2 className="mt-6 text-xl font-semibold text-gray-800">My Courses</h2>

      {loading ? (
        <p className="mt-2 text-gray-500">Loading your courses...</p>
      ) : enrollments.length === 0 ? (
        <p className="mt-2 text-gray-500">
          You are not enrolled in any course yet.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {enrollments.map((enrollment) => (
            <div
              key={enrollment._id}
              className="flex items-center justify-between rounded-lg bg-white px-4 py-3 shadow"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {enrollment.course?.title}
                </p>
                <p className="text-xs text-gray-500">
                  {enrollment.course?.instructor?.name || "Instructor"}
                </p>
              </div>
              <Link
                to={`/course/${enrollment.course?._id}`}
                className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
              >
                Go to course
              </Link>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
