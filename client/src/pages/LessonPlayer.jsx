import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import useAuth from "../context/AuthContext";

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    api
      .get(`/courses/${courseId}/lessons/${lessonId}`)
      .then((res) => setLesson(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [courseId, lessonId, user, authLoading, navigate]);

  if (loading || authLoading) {
    return (
      <MainLayout>
        <p className="p-6 text-gray-500">Loading lesson...</p>
      </MainLayout>
    );
  }

  if (!lesson) {
    return (
      <MainLayout>
        <p className="p-6 text-gray-500">Lesson not found.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl px-4 py-8">

        {/* Lesson Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {lesson.title}
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          {lesson.duration || "Video lesson"}
        </p>

        {/* Video Player */}
        <div className="overflow-hidden rounded-lg bg-black shadow">
          <video
            src={lesson.videoUrl}
            controls
            controlsList="nodownload"
            className="w-full h-[420px] bg-black"
          />
        </div>

      </div>
    </MainLayout>
  );
}
