// client\src\pages\CourseCard.jsx

import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow hover:shadow-lg transition">

      {/* Thumbnail */}
      <Link to={`/courses/${course._id}`}>
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-40 w-full object-cover"
          onError={(e) => (e.target.src = "/default-course.png")}
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        <h3 className="line-clamp-2 font-semibold text-gray-800">
          {course.title}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          {course.category} · {course.level?.toUpperCase()}
        </p>

        <Link
          to={`/courses/${course._id}`}
          className="mt-4 block rounded bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
