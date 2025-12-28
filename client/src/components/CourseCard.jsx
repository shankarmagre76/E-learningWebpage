import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow">
      {course.thumbnail && (
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-40 w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col px-4 py-3">
        <h3 className="line-clamp-2 text-lg font-bold text-gray-800">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {course.instructor?.name || "Instructor"}
        </p>
        <p className="mt-2 text-xs uppercase text-blue-600">
          {course.category || "General"} ·{" "}
          {course.level ? course.level.toUpperCase() : "ALL LEVELS"}
        </p>
        <Link
          to={`/courses/${course._id}`}
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
