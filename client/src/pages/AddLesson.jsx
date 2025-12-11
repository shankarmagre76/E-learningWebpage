// src/pages/AddLesson.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { createLesson } from "../services/courseService";

export default function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("video", videoFile);

    setLoading(true);
    try {
      await createLesson(courseId, formData);
      alert("Lesson created successfully!");
      navigate("/instructor/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-gray-900">Add Lesson</h1>
        <p className="text-sm text-gray-600 mt-1">
          Upload lesson content and video for this course.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Lesson Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-3 rounded focus:border-blue-500 outline-none"
          />

          <textarea
            placeholder="Lesson content / notes"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-3 rounded focus:border-blue-500 outline-none"
          />

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Create Lesson"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
