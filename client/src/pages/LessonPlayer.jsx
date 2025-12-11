import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { fetchCourseById, markLessonComplete, getCourseProgress } from "../services/courseService";
import VideoPlayer from "../components/VideoPlayer";

export default function LessonPlayer() {
  const { courseId, lessonId } = useParams();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const [courseRes, progressRes] = await Promise.all([
        fetchCourseById(courseId),
        getCourseProgress(courseId),
      ]);
      setCourse(courseRes.data);
      setProgress(progressRes.data);
    };
    load();
  }, [courseId]);

  const lesson = useMemo(
    () => course?.lessons?.find((l) => l._id === lessonId),
    [course, lessonId]
  );

  const handleMarkComplete = async () => {
    setSaving(true);
    try {
      const res = await markLessonComplete(courseId, lessonId);
      setProgress(res.data);
    } catch (e) {
      alert("Failed to update progress");
    } finally {
      setSaving(false);
    }
  };

  const completedIds = new Set(
    progress?.completedLessons?.map((l) => l._id) || []
  );
  const isCompleted = completedIds.has(lessonId);

  if (!course || !lesson) {
    return (
      <MainLayout>
        <p className="text-gray-500">Loading lesson...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-gray-900">
          {course.title} – <span className="text-blue-600">{lesson.title}</span>
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Duration: {lesson.duration || 0} min
        </p>

        <div className="mt-4">
          <VideoPlayer videoUrl={lesson.videoUrl} />
        </div>

        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={handleMarkComplete}
            disabled={saving}
            className={`rounded px-4 py-2 text-sm font-medium text-white ${
              isCompleted
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-600 hover:bg-blue-700"
            } disabled:opacity-60`}
          >
            {isCompleted
              ? "Marked as Completed"
              : saving
              ? "Saving..."
              : "Mark as Completed"}
          </button>
        </div>

        {lesson.content && (
          <div className="mt-6 rounded-lg bg-white p-4 shadow">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Lesson Notes
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              {lesson.content}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
