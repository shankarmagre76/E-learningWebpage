import Enrollment from "../models/Enrollment.js";
import Course from "../models/Course.js";

export const enrollInCourse = async (req, res) => {
  try {
    const studentId = req.user._id;
    const { courseId } = req.params;

    // Check course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Prevent duplicate enrollment
    const exists = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });

    if (exists) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    await Enrollment.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({ message: "Enrollment successful" });
  } catch (error) {
    res.status(500).json({ message: "Enrollment failed" });
  }
};




export const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    }).populate({
      path: "course",
      populate: { path: "instructor", select: "name" },
    });

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch enrolled courses" });
  }
};
