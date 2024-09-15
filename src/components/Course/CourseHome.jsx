// components/CourseHome.jsx
"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import VideoPlayer from "./VideoPlayer";
import TabContent from "./TabContent";
import CourseNavTab from "./CourseNavTab";
import { motion } from "framer-motion";

const lessons = [
  "Introduction to JavaScript + Setup | JavaScript Tutorial in Hindi #1",
  "Variables in JavaScript | JavaScript Tutorial in Hindi #2",
  "const, let and var in JavaScript | JavaScript Tutorial in Hindi #3",
  "Primitives and Objects in JavaScript | JavaScript Tutorial in Hindi #4",
  "JavaScript Chapter 1 - Practice Set | JavaScript Tutorial in Hindi #5",
];

export default function CourseHome() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const handlePrevious = () => {
    if (currentLesson > 0) setCurrentLesson(currentLesson - 1);
  };

  const handleNext = () => {
    if (currentLesson < lessons.length - 1) setCurrentLesson(currentLesson + 1);
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row min-h-screen bg-[#f8f3ff]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar
        lessons={lessons}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
      />

      <motion.main
        className="flex-1 p-6 space-y-6 overflow-y-auto"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {/* Video Player and Tabs Section */}
        <div className="flex flex-col space-y-4">
          {/* Video Player Section */}
          <motion.div
            className="w-full"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <VideoPlayer lesson={lessons[currentLesson]} />
          </motion.div>

          {/* Tab Content Section (Now Below Video Player) */}
          <motion.div
            className="w-full"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex border-b">
                {["overview", "q&a", "downloads", "announcements"].map(
                  (tab) => (
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
                  )
                )}
              </div>
              <TabContent activeTab={activeTab} />
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <CourseNavTab
            currentLesson={currentLesson}
            totalLessons={lessons.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
