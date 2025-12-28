// src/pages/InstructorDashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { getInstructorCourses } from "../services/courseService";
import useAuth from "../context/AuthContext";


export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInstructorCourses()
      .then((res) => setCourses(res.data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your courses and add lessons.
            </p>
          </div>
          <Link
            to="/instructor/create-course"
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            + Create New Course
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading your courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500">
            You haven&apos;t created any courses yet.
          </p>
        ) : (
          <div className="space-y-3">
            {courses.map((course) => (
              <div
                key={course._id}
                className="flex items-center justify-between gap-4 rounded bg-white px-4 py-3 shadow hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-course.png";
                    }}
                  />
                </div>

                {/* Course Info */}
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.category} · {course.level?.toUpperCase()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to={`/instructor/courses/${course._id}/lessons`}
                    className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                  >
                    Manage Lessons
                  </Link>
                  <Link
                    to={`/courses/${course._id}/lessons`}
                    className="rounded bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    View Lessons
                  </Link>
                </div>
              </div>

            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
