// client/src/pages/CourseLessons.jsx

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
    if (authLoading) return;

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
        <p className="flex items-center gap-2 p-6 text-gray-500">
          <i className="fas fa-spinner fa-spin"></i>
          Loading lessons...
        </p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* Course Header */}
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <i className="fas fa-book-open text-blue-600"></i>
            {course?.title}
          </h1>
          <p className="flex items-center gap-2 text-sm text-gray-500">
            <i className="fas fa-list"></i>
            {lessons.length} Lessons
          </p>
        </div>

        {/* Lessons List */}
        {lessons.length === 0 ? (
          <p className="flex items-center gap-2 text-gray-500">
            <i className="fas fa-circle-info"></i>
            No lessons available.
          </p>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <Link
                key={lesson._id}
                to={`/courses/${courseId}/lessons/${lesson._id}`}
                className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 hover:bg-gray-50 transition"
              >
                <div className="flex items-start gap-3">
                  <i className="fas fa-play-circle text-blue-500 text-lg mt-1"></i>
                  <div>
                    <p className="font-medium text-gray-800">
                      Lesson {index + 1}: {lesson.title}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500">
                      <i className="fas fa-clock"></i>
                      {lesson.duration || "Video"}
                    </p>
                  </div>
                </div>

                <span className="flex items-center gap-2 text-sm font-medium text-blue-600">
                  Watch
                  <i className="fas fa-arrow-right"></i>
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
