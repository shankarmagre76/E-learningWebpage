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
      .catch(() => { })
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
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;

            if (!course) return null;

            return (
              <div
                key={enrollment._id}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-40 w-full object-cover"
                    onError={(e) => (e.target.src = "/default-course.png")}
                  />
                )}

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 py-3">
                  <h3 className="line-clamp-2 text-lg font-bold text-gray-800">
                    {course.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {course.instructor?.name || "Instructor"}
                  </p>

                  <p className="mt-2 text-xs uppercase text-blue-600">
                    {course.category || "General"} ·{" "}
                    {course.level ? course.level.toUpperCase() : "ALL LEVELS"}
                  </p>

                  <Link
                    to={`/courses/${course._id}/lessons`}
                    className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Go to Course
                  </Link>


                  {/* <Link
                    to={`/courses/${course._id}`}
                    className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Go to Course
                  </Link> */}
                </div>
              </div>
            );
          })}
        </div>

      )}
    </DashboardLayout>
  );
}
