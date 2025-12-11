// src/pages/CreateCourse.jsx
import { useState } from "react";
import useAuth from "../context/AuthContext";
import axios from "axios";
// import useAuth from "../context/AuthContext";

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

  // 🔥 Preview thumbnail
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

      const res = await axios.post(
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
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create Course</h2>

      <form onSubmit={submitCourse}>
        <label>Course Title</label>
        <input
          name="title"
          type="text"
          className="block w-full border p-2 mb-3"
          onChange={onChange}
          required
        />

        <label>Subtitle</label>
        <input
          name="subtitle"
          type="text"
          className="block w-full border p-2 mb-3"
          onChange={onChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          className="block w-full border p-2 mb-3"
          onChange={onChange}
          required
        ></textarea>

        <label>Category</label>
        <input
          name="category"
          type="text"
          className="block w-full border p-2 mb-3"
          onChange={onChange}
          required
        />

        <label>Level</label>
        <select
          name="level"
          className="block w-full border p-2 mb-3"
          onChange={onChange}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Thumbnail</label>
        <input
          type="file"
          accept="image/*"
          onChange={onThumbnailChange}
          className="block mb-2"
        />

        {preview && (
          <img
            src={preview}
            alt="Thumbnail Preview"
            className="w-48 h-32 object-cover mb-4 rounded shadow"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
