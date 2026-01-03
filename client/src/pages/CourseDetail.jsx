// client\src\pages\CourseDetail.jsx  this page will show you all lessons

import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { enrollInCourse, fetchCourseById, getCourseProgress } from "../services/courseService";
import useAuth from "../hooks/useAuth";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [courseRes, progressRes] = await Promise.allSettled([
          fetchCourseById(id),
          user ? getCourseProgress(id) : Promise.resolve({ data: null }),
        ]);

        if (courseRes.status === "fulfilled") {
          setCourse(courseRes.value.data);
        }
        if (progressRes.status === "fulfilled") {
          setProgress(progressRes.value.data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setEnrolling(true);
    try {
      await enrollInCourse(id);
      alert("Enrolled successfully!");
      const progRes = await getCourseProgress(id);
      setProgress(progRes.data);
    } catch (e) {
      alert(e.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading course...</p>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <p className="text-red-500">Course not found.</p>
      </MainLayout>
    );
  }

  const completedIds = new Set(
    progress?.completedLessons?.map((l) => l._id) || []
  );

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="mt-2 text-gray-600">{course.subtitle}</p>
        <p className="mt-1 text-sm text-gray-500">
          By {course.instructor?.name || "Instructor"} ·{" "}
          {course.level?.toUpperCase() || "ALL LEVELS"}
        </p>

        <div className="mt-4 flex gap-4">
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="rounded bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {enrolling ? "Enrolling..." : "Enroll for Free"}
          </button>
        </div>

        <hr className="my-6" />

        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Course Content
        </h2>
        {course.lessons?.length === 0 ? (
          <p className="text-gray-500">No lessons yet.</p>
        ) : (
          <ul className="divide-y rounded-lg bg-white shadow">
            {course.lessons.map((lesson) => (
              <li
                key={lesson._id}
                className="flex items-center justify-between px-4 py-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{lesson.title}</p>
                  <p className="text-xs text-gray-500">
                    {lesson.duration || 0} min
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {completedIds.has(lesson._id) && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                      Completed
                    </span>
                  )}
                  <Link
                    to={`/course/${course._id}/lesson/${lesson._id}`}
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                  >
                    Watch
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  );
}
