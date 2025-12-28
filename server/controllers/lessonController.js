import Course from "../models/Course.js";
import Lesson from "../models/Lesson.js";

export const createLesson = async (req, res) => {
  try {
    const { title, order, duration } = req.body;

    if (!title || !order || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const lesson = await Lesson.create({
      title,
      order: Number(order),
      duration,
      videoUrl: req.file.path, // ✅ CLOUDINARY URL
      course: req.params.courseId,
    });

    course.lessons = course.lessons || [];
    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    console.error("CREATE LESSON ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




export const getCourseLessons = async (req, res) => {
    try {
        const { courseId } = req.params;

        // Find lessons of course, sorted by order
        const lessons = await Lesson.find({ course: courseId })
            .sort({ order: 1 });

        res.status(200).json(lessons);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch lessons" });
    }
};



export const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lesson" });
  }
};
