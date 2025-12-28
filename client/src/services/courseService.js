import api from "./api";

export const getMyCourses = () => api.get("/courses/my-courses");

export const createCourse = (data) => api.post("/courses", data);

export const getInstructorCourses = () => api.get("/courses/instructor");

export const createLesson = (courseId, formData) =>
  api.post(`/courses/${courseId}/lessons`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ PUBLIC COURSES
export const fetchCourses = () => api.get("/courses");
