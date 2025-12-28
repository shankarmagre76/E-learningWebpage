import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CourseCard from "../components/CourseCard";
import { fetchCourses } from "../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Explore Courses
          </h2>
          <p className="mt-2 text-gray-600">
            Learn new skills from industry experts
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full sm:w-64 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="rounded-md border px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Web Development</option>
            <option>AI & ML</option>
            <option>Programming</option>
          </select>

          <select className="rounded-md border px-3 py-2 text-sm">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-gray-500">Loading courses...</p>
        ) : courses.length === 0 ? (
          <div className="rounded-md bg-gray-50 p-6 text-center text-gray-500">
            No courses available at the moment.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
