import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  adminFetchUsers,
  adminFetchCourses,
  adminUpdateUserRole,
} from "../services/courseService";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);

  useEffect(() => {
    adminFetchUsers()
      .then((res) => setUsers(res.data))
      .catch(() => {})
      .finally(() => setLoadingUsers(false));

    adminFetchCourses()
      .then((res) => setCourses(res.data))
      .catch(() => {})
      .finally(() => setLoadingCourses(false));
  }, []);

  const changeRole = async (userId, role) => {
    try {
      const res = await adminUpdateUserRole(userId, role);
      setUsers((prev) =>
        prev.map((u) => (u._id === res.data._id ? res.data : u))
      );
    } catch (e) {
      alert("Failed to update role");
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage users and courses from one place.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Users */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">Users</h2>
            {loadingUsers ? (
              <p className="text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
              <p className="text-gray-500">No users found.</p>
            ) : (
              <div className="space-y-2">
                {users.map((u) => (
                  <div
                    key={u._id}
                    className="flex items-center justify-between rounded bg-white px-3 py-2 text-sm shadow"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        {u.role}
                      </span>
                      <button
                        onClick={() => changeRole(u._id, "student")}
                        className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700"
                      >
                        Student
                      </button>
                      <button
                        onClick={() => changeRole(u._id, "instructor")}
                        className="rounded bg-green-100 px-2 py-1 text-xs text-green-700"
                      >
                        Instructor
                      </button>
                      <button
                        onClick={() => changeRole(u._id, "admin")}
                        className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700"
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Courses */}
          <div>
            <h2 className="mb-3 text-xl font-semibold text-gray-800">
              Courses
            </h2>
            {loadingCourses ? (
              <p className="text-gray-500">Loading courses...</p>
            ) : courses.length === 0 ? (
              <p className="text-gray-500">No courses found.</p>
            ) : (
              <div className="space-y-2">
                {courses.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center justify-between rounded bg-white px-3 py-2 text-sm shadow"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{c.title}</p>
                      <p className="text-xs text-gray-500">
                        {c.instructor?.name || "Instructor"}
                      </p>
                    </div>
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                      {c.category || "General"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
