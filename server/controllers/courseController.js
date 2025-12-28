// server\controllers\courseController.js

import Course from "../models/Course.js";

// ===================================================
// Create Course  (POST /api/courses)
// ===================================================
export const createCourse = async (req, res) => {
  try {
    const { title, subtitle, description, category, level } = req.body;

    const thumbnailUrl = req.file ? req.file.path : "";

    const course = await Course.create({
      title,
      subtitle,
      description,
      category,
      level,
      thumbnail: thumbnailUrl,
      instructor: req.user._id,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===================================================
// Get All Courses  (GET /api/courses)
// ===================================================
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().select("-lessons");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getCourseById = async (req, res) => {
  try {
    console.log("Requested Course ID:", req.params.id);

    const course = await Course.findById(req.params.id);

    console.log("Course from DB:", course);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Invalid course ID" });
  }
};
