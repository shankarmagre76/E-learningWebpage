// src/pages/CreateCourse.jsx
import { useState } from "react";
import useAuth from "../context/AuthContext";
import axios from "axios";

export default function CreateCourse() {
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "",
    level: "beginner"
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("subtitle", form.subtitle);
      fd.append("description", form.description);
      fd.append("category", form.category);
      fd.append("level", form.level);
      if (thumbnail) fd.append("thumbnail", thumbnail);

      await axios.post(
        "http://localhost:5000/api/courses",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Course created successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error creating course");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow">

      {/* Header */}
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
        <i className="fas fa-circle-plus text-blue-600"></i>
        Create Course
      </h2>

      <form onSubmit={submitCourse} className="space-y-4">

        {/* Title */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-heading text-gray-500"></i>
            Course Title
          </label>
          <input
            name="title"
            type="text"
            className="block w-full border p-2 rounded"
            onChange={onChange}
            required
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-quote-left text-gray-500"></i>
            Subtitle
          </label>
          <input
            name="subtitle"
            type="text"
            className="block w-full border p-2 rounded"
            onChange={onChange}
          />
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-align-left text-gray-500"></i>
            Description
          </label>
          <textarea
            name="description"
            className="block w-full border p-2 rounded"
            onChange={onChange}
            required
          ></textarea>
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-tags text-gray-500"></i>
            Category
          </label>
          <input
            name="category"
            type="text"
            className="block w-full border p-2 rounded"
            onChange={onChange}
            required
          />
        </div>

        {/* Level */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-signal text-gray-500"></i>
            Level
          </label>
          <select
            name="level"
            className="block w-full border p-2 rounded"
            onChange={onChange}
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="flex items-center gap-2 font-medium">
            <i className="fas fa-image text-gray-500"></i>
            Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={onThumbnailChange}
            className="block"
          />
        </div>

        {/* Preview */}
        {preview && (
          <div className="flex items-center gap-3 mt-2">
            <i className="fas fa-eye text-blue-500"></i>
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-48 h-32 object-cover rounded shadow"
            />
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <i className={`fas ${loading ? "fa-spinner fa-spin" : "fa-upload"}`}></i>
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>
    </div>
  );
}
