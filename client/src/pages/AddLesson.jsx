// src/pages/AddLesson.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { createLesson } from "../services/courseService";

export default function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const [duration, setDuration] = useState("");
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
    formData.append("order", order);
    formData.append("duration", duration);
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

        {/* Header */}
        <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
          <i className="fas fa-circle-plus text-green-600"></i>
          Add Lesson
        </h1>
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
          <i className="fas fa-video"></i>
          Upload lesson content and video for this course.
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">

          {/* Lesson Title */}
          <div className="relative">
            <i className="fas fa-heading absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Lesson Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border p-3 pl-10 rounded focus:border-blue-500 outline-none"
            />
          </div>

          {/* Lesson Order */}
          <div className="relative">
            <i className="fas fa-list-ol absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="number"
              placeholder="Lesson Order (1, 2, 3...)"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              required
              className="w-full border p-3 pl-10 rounded focus:border-blue-500 outline-none"
            />
          </div>

          {/* Duration */}
          <div className="relative">
            <i className="fas fa-clock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Duration (e.g. 10 min)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border p-3 pl-10 rounded focus:border-blue-500 outline-none"
            />
          </div>

          {/* Video Upload */}
          <div className="relative">
            <label className="mb-1 block text-sm font-medium text-gray-600">
              <i className="fas fa-file-video mr-2 text-blue-500"></i>
              Lesson Video
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded bg-green-600 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
          >
            <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-upload"}`}></i>
            {loading ? "Uploading..." : "Create Lesson"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
}
