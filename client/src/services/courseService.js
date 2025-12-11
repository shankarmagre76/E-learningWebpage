// src/services/courseService.js
import api from "./api";
export const getMyCourses = () => api.get("/courses/my-courses");

// Create a new course (instructor only)
export const createCourse = (data) => api.post("/courses", data);

// Get courses created by logged-in instructor
export const getInstructorCourses = () => api.get("/courses/instructor");

// Create lesson with video upload (Cloudinary-ready backend)
export const createLesson = (courseId, formData) =>
  api.post(`/courses/${courseId}/lessons`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
