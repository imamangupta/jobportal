// components/CourseNavTab.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CourseNavTab({
  currentLessonIndex,
  totalLessons,
  onPrevious,
  onNext,
}) {
  return (
    <div className="flex justify-between">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-purple-600 text-white px-6 py-2 rounded-full ${
          currentLessonIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onPrevious}
        disabled={currentLessonIndex === 0}
      >
        Previous
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-purple-600 text-white px-6 py-2 rounded-full ${
          currentLessonIndex === totalLessons - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={onNext}
        disabled={currentLessonIndex === totalLessons - 1}
      >
        Next
      </motion.button>
    </div>
  );
}
