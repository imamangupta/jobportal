// components/Sidebar.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Sidebar({ lessons, currentLesson, setCurrentLesson }) {
  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="w-full lg:w-80 bg-white shadow-lg h-full lg:h-screen mt-6" // Ensures the sidebar takes full height in desktop
    >
      <div className="p-6 rounded-sm  bg-purple-600 text-white">
        <h2 className="text-2xl font-bold">JavaScript Course</h2>
        <p className="mt-2 text-sm">Master JavaScript from scratch</p>
      </div>
      <nav className="p-4 h-[calc(100vh-128px)] overflow-y-auto">
        {" "}
        {/* Adjusted height and added scroll */}
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Course Content
        </h3>
        <ul className="space-y-2">
          {lessons.map((lesson, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ease-in-out flex items-center ${
                  currentLesson === index
                    ? "bg-purple-100 text-purple-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => setCurrentLesson(index)}
              >
                <span className="mr-3 text-purple-600">{index + 1}</span>
                <span className="text-sm">{lesson}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
}
