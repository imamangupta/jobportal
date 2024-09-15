// components/Navigation.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CourseNavTab({
  currentLesson,
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
          currentLesson === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onPrevious}
        disabled={currentLesson === 0}
      >
        Previous
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`bg-purple-600 text-white px-6 py-2 rounded-full ${
          currentLesson === totalLessons - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={onNext}
        disabled={currentLesson === totalLessons - 1}
      >
        Next
      </motion.button>
    </div>
  );
}
