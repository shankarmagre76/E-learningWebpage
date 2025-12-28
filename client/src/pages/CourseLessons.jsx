// client\src\pages\CourseLessons.jsx

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import useAuth from "../context/AuthContext";

export default function CourseLessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ wait for auth context
    if (authLoading) return;

    // 🔐 redirect if not logged in
    // if (!user) {
    //   navigate("/login");
    //   return;
    // }

    Promise.all([
      api.get(`/courses/${courseId}`),
      api.get(`/courses/${courseId}/lessons`)
    ])
      .then(([courseRes, lessonsRes]) => {
        setCourse(courseRes.data);
        setLessons(lessonsRes.data);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login");
        }
      })
      .finally(() => setLoading(false));
  }, [courseId, user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <MainLayout>
        <p className="p-6 text-gray-500">Loading lessons...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* Course header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {course?.title}
          </h1>
          <p className="text-sm text-gray-500">
            {lessons.length} Lessons
          </p>
        </div>

        {/* Lessons list */}
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons available.</p>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson._id}
                to={`/courses/${courseId}/lessons/${lesson._id}`}
                className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    Lesson {index + 1}: {lesson.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {lesson.duration || "Video"}
                  </p>
                </div>

                <span className="text-sm text-blue-600">
                  Watch →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
