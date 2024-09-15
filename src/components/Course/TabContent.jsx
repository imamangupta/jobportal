// components/TabContent.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TabContent({ activeTab }) {
  const [question, setQuestion] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Course Overview</h3>
            <p className="text-sm text-gray-700">
              This comprehensive JavaScript course will take you from a beginner
              to an advanced level. You'll learn everything from basic syntax to
              complex concepts like closures and promises.
            </p>
          </motion.div>
        );
      case "q&a":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Q&A Section</h3>
            <textarea
              className="w-full p-2 border rounded-md mb-2 text-sm"
              rows="3"
              placeholder="Ask your question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Submit Question
            </motion.button>
          </motion.div>
        );
      case "downloads":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Downloads</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Course Slides.pdf",
                "Exercise Files.zip",
                "Cheat Sheet.pdf",
              ].map((file, index) => (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span>{file}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-purple-600 text-white px-2 py-1 rounded-md text-xs"
                  >
                    Download
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        );
      case "announcements":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-bold mb-2">Announcements</h3>
            <div
              className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 mb-2 text-sm"
              role="alert"
            >
              <p className="font-bold">New Content Alert!</p>
              <p>
                We've just added a new section on ES6 features. Check it out in
                Module 5!
              </p>
            </div>
            <div
              className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-2 text-sm"
              role="alert"
            >
              <p className="font-bold">Upcoming Live Session</p>
              <p>Join us for a live Q&A session this Friday at 3 PM EST.</p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 h-[calc(100%-40px)] overflow-y-auto">
      {" "}
      {/* Added w-full */}
      {renderContent()}
    </div>
  );
}
