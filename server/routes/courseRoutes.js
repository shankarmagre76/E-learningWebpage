// server\routes\courseRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import uploadImage from "../utils/uploadImage.js";
import multer from "multer";
// import multer from "multer";
import videoStorage from "../utils/uploadVideo.js";

const uploadVideo = multer({ storage: videoStorage });

import {
  createCourse,
  getAllCourses,
  getInstructorCourses,
  getCourseById
} from "../controllers/courseController.js";

import { enrollInCourse } from "../controllers/enrollmentController.js";
import { getMyCourses } from "../controllers/enrollmentController.js";
// import { getCourseLessons } from "../controllers/lessonController.js";
import {
  getCourseLessons,
  createLesson,
  getLessonById 
} from "../controllers/lessonController.js";

const router = express.Router();

// Public: all courses
router.get("/", getAllCourses);

// Instructor courses
router.get(
  "/instructor",
  authMiddleware,
  requireRole("instructor", "admin"),
  getInstructorCourses
);
// =============================
// Student: My enrolled courses
// GET /api/courses/my-courses
// =============================
router.get(
  "/my-courses",
  authMiddleware,
  requireRole("student"),
  getMyCourses
);
// =============================
// Instructor: Create lesson (VIDEO UPLOAD)
// POST /api/courses/:courseId/lessons
// =============================
router.post(
  "/:courseId/lessons",
  authMiddleware,
  requireRole("instructor", "admin"),
  uploadVideo.single("video"),
  createLesson
);

// =============================
// Get lessons of a course
// GET /api/courses/:courseId/lessons
// =============================
router.get(
  "/:courseId/lessons",
  authMiddleware,
  getCourseLessons
);

// =============================
// Get single lesson (VIDEO PLAYER)
// GET /api/courses/:courseId/lessons/:lessonId
// =============================
router.get(
  "/:courseId/lessons/:lessonId",
  authMiddleware,
  getLessonById
);


// Course details
router.get("/:id", getCourseById);

// Student enroll
router.post(
  "/:courseId/enroll",
  authMiddleware,
  requireRole("student"),
  enrollInCourse
);

// Create course
router.post(
  "/",
  authMiddleware,
  requireRole("instructor", "admin"),
  uploadImage.single("thumbnail"),
  createCourse
);

export default router;

