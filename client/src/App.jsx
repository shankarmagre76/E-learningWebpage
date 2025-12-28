import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import CreateCourse from "./pages/CreateCourse";
import AddLesson from "./pages/AddLesson";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import CourseLessons from "./pages/CourseLessons";
import LessonPlayer from "./pages/LessonPlayer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route
          path="/courses/:courseId/lessons"
          element={<CourseLessons />}
        />
        <Route
          path="/courses/:courseId/lessons/:lessonId"
          element={<LessonPlayer />}
        />
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Instructor */}
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
        <Route path="/instructor/create-course" element={<CreateCourse />} />
        <Route
          path="/instructor/courses/:courseId/lessons"
          element={<AddLesson />}
        />
      </Routes>
    </BrowserRouter>
  );
}
