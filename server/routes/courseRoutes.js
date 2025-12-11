// server\routes\courseRoutes.js

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";
import { createCourse, getAllCourses } from "../controllers/courseController.js";
import uploadImage from "../utils/uploadImage.js";
import { getInstructorCourses } from "../controllers/courseController.js";

const router = express.Router();

// =============================
// Public Route: List all courses
// GET /api/courses
// =============================
router.get("/", getAllCourses);

// =============================
// Protected Route: Create course
// POST /api/courses
// =============================
router.post(
  "/",
  authMiddleware,
  requireRole("instructor", "admin"),
  uploadImage.single("thumbnail"),
  createCourse
);

router.get(
  "/instructor",
  authMiddleware,
  requireRole("instructor", "admin"),
  getInstructorCourses
);

export default router;
