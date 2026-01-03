// client\src\pages\CourseDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import EnrollButton from "../components/EnrollButton";


export default function CourseDetails() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/courses/${courseId}`)
            .then((res) => {
                console.log("COURSE API RESPONSE:", res.data);
                setCourse(res.data);
            })
            .catch((err) => {
                console.error("API ERROR:", err);
            })
            .finally(() => setLoading(false));
    }, [courseId]);

    if (loading) {
        return (
            <MainLayout>
                <p className="p-8 text-gray-500">Loading course...</p>
            </MainLayout>
        );
    }

    if (!course) {
        return (
            <MainLayout>
                <p className="p-8 text-gray-500">Course not found.</p>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="mx-auto max-w-5xl px-4 py-8">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {course.title}
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {course.category} · {course.level?.toUpperCase()}
                    </p>
                </div>
                <h3 className="text-gray-700 font-semibold">
                    Instructor: {course.instructor?.name || "Unknown"}
                </h3>


                {/* Thumbnail */}
                <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="mb-6 h-64 w-full rounded-lg object-cover"
                />

                {/* Description */}
                <p className="mb-8 text-gray-700 leading-relaxed">
                    {course.description}
                </p>

                {/* Enroll Button */}
                <EnrollButton courseId={course._id} />

            </div>
        </MainLayout>
    );
}
