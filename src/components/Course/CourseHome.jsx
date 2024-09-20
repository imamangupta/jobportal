"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import VideoPlayer from "./VideoPlayer";
import CourseNavTab from "./CourseNavTab";
import TabContent from "./TabContent";
import { motion } from "framer-motion";

const lessons = [
  {
    id: 1,
    title: "Introduction to JavaScript + Setup | JavaScript Tutorial in Hindi #1",
    overview:
      "In this lesson, you will learn the basics of JavaScript and how to set up your development environment.",
    qna: [
      {
        question: "What is JavaScript?",
        answer: "JavaScript is a versatile programming language used for web development.",
      },
      {
        question: "How to set up a JavaScript environment?",
        answer: "You can set up using any code editor like VS Code and running scripts in a browser.",
      },
    ],
    downloadFile: "https://example.com/download/setup-files.zip",
    videoUrl: "https://www.youtube.com/embed/gwqMq_4ZEP0?si=AWFF58wYWX6s_oi9",
  },
  {
    id: 2,
    title: "Variables in JavaScript | JavaScript Tutorial in Hindi #2",
    overview:
      "This lesson covers variables in JavaScript, including the types of variables and how to use them.",
    qna: [
      {
        question: "What are variables?",
        answer: "Variables are containers for storing data values and are fundamental in JavaScript.",
      },
      {
        question: "What are the data types in JavaScript?",
        answer: "Common data types include strings, numbers, booleans, undefined, null, and objects.",
      },
    ],
    downloadFile: "https://example.com/download/variables-files.zip",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_2",
  },{
    id: 3,
    title: "const, let and var in JavaScript | JavaScript Tutorial in Hindi #3",
    overview:
      "Learn the differences between const, let, and var, and when to use each in JavaScript.",
    qna: [
      {
        question: "What is the difference between const, let, and var?",
        answer:
          "const is for constants, let is for block-scoped variables, and var is function-scoped.",
      },
    ],
    downloadFile: "https://example.com/download/const-let-var-files.zip",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_3",
  },
  {
    id: 4,
    title: "Primitives and Objects in JavaScript | JavaScript Tutorial in Hindi #4",
    overview:
      "Understand the distinction between primitive data types and objects in JavaScript.",
    qna: [
      {
        question: "What are primitive types?",
        answer:
          "Primitive types include string, number, boolean, null, undefined, symbol, and bigint.",
      },
    ],
    downloadFile: "https://example.com/download/primitives-objects-files.zip",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_4",
  },
  {
    id: 5,
    title: "JavaScript Chapter 1 - Practice Set | JavaScript Tutorial in Hindi #5",
    overview:
      "This practice set will help you reinforce your understanding of the topics covered in Chapter 1.",
    qna: [
      {
        question: "What is included in the practice set?",
        answer: "It includes exercises on variables, data types, and basic JavaScript syntax.",
      },
    ],
    downloadFile: "https://example.com/download/practice-set.zip",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_5",
  },
  // ... other lessons ...
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
        {/* Video Player Section */}
        <motion.div
          className="w-full"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 50 }}
        >
          <VideoPlayer lesson={lessons[currentLesson].title} videoUrl={lessons[currentLesson].videoUrl} />
        </motion.div>

        {/* Tab Content Section */}
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
              lesson={lessons[currentLesson]} // Pass the entire lesson object
            />
          </div>
        </motion.div>

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
