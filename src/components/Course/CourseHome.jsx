"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import VideoPlayer from "./VideoPlayer";
import CourseNavTab from "./CourseNavTab"; // Ensure the correct import
import TabContent from "./TabContent";
import { motion } from "framer-motion";
import { useParams, useRouter } from 'next/navigation';
import { courses } from "@/utils/courses";

export default function CourseHome() {
  const router = useRouter();
  const params =useParams();
  let {courseId}=params 
  // const { courseId } = router.query || {};
  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (courseId) {
      const foundCourse = courses.find(c => c.id.toString() === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // Redirect to courses page if course not found
        router.push('/courses');
      }
    }
  }, [courseId, router]);

  // Loading state for courseId
  if (!courseId) {
    return <div className="text-center">Loading course information...</div>;
  }

  // Loading state for course data
  if (!course) {
    return <div className="text-center">Loading course details...</div>;
  }

  const handlePrevious = () => {
    if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
  };

  const handleNext = () => {
    if (currentLessonIndex < course.lessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1);
  };

  const currentLesson = course.lessons[currentLessonIndex];

  return (
    <motion.div
      className="flex flex-col md:flex-row min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar
        title={course.title}
        lessons={course.lessons}
        currentLessonIndex={currentLessonIndex}
        setCurrentLessonIndex={setCurrentLessonIndex}
      />

      <motion.main
        className="flex-1 p-6 space-y-6 overflow-y-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <motion.div
          className="w-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <VideoPlayer lesson={currentLesson.title} videoUrl={currentLesson.videoUrl} />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex border-b">
              {["overview", "q&a", "downloads", "announcements"].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  className={`flex-1 px-4 py-2 text-sm font-medium transition-colors duration:200 ease-in-out ${
                    activeTab === tab
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
            <TabContent
              activeTab={activeTab}
              lesson={currentLesson}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <CourseNavTab
            currentLesson={currentLessonIndex}
            totalLessons={course.lessons.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
