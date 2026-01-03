import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
      
      {/* Thumbnail */}
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-40 w-full object-cover"
        />
      )}

      <div className="flex flex-1 flex-col px-4 py-3">

        {/* Course Title */}
        <h3 className="line-clamp-2 text-lg font-bold text-gray-800 flex items-start gap-2">
          <i className="fas fa-book-open text-blue-500 mt-1"></i>
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="mt-1 flex items-center gap-2 text-sm text-gray-500">
          <i className="fas fa-user-tie text-gray-400"></i>
          {course.instructor?.name || "Instructor"}
        </p>

        {/* Category & Level */}
        <p className="mt-2 flex items-center gap-2 text-xs uppercase text-blue-600">
          <i className="fas fa-tags"></i>
          {course.category || "General"}
          <span className="text-gray-400">•</span>
          <i className="fas fa-signal"></i>
          {course.level ? course.level.toUpperCase() : "ALL LEVELS"}
        </p>

        {/* CTA */}
        <Link
          to={`/courses/${course._id}`}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          <i className="fas fa-circle-info"></i>
          View Details
        </Link>

      </div>
    </div>
  );
}
