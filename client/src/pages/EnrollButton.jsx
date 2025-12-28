import { useEffect, useState } from "react";
import api from "../services/api";
import useAuth from "../context/AuthContext";

export default function EnrollButton({ courseId }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  // Optional: check if already enrolled
  useEffect(() => {
    if (!user || user.role !== "student") return;

    api
      .get(`/enrollments/${courseId}`)
      .then(() => setEnrolled(true))
      .catch(() => {});
  }, [courseId, user]);

  if (!user) {
    return (
      <p className="text-sm text-gray-500">
        Login as a student to enroll.
      </p>
    );
  }

  if (user.role !== "student") {
    return null;
  }

  const handleEnroll = async () => {
    try {
      setLoading(true);
      await api.post(`/courses/${courseId}/enroll`);
      setEnrolled(true);
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleEnroll}
      disabled={loading || enrolled}
      className="rounded bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {enrolled ? "Enrolled" : loading ? "Enrolling..." : "Enroll Now"}
    </button>
  );
}
