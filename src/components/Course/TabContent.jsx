// components/TabContent.jsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TabContent({ activeTab, lesson }) {
  const [question, setQuestion] = useState("");

  const handleQuestionSubmit = () => {
    if (question.trim()) {
      console.log("Question submitted:", question);
      setQuestion(""); // Clear input
    } else {
      alert("Please enter a question before submitting.");
    }
  };

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
            <p className="text-sm text-gray-700">{lesson.overview}</p>
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
              aria-label="Ask your question"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm"
              onClick={handleQuestionSubmit}
            >
              Submit Question
            </motion.button>
            <div className="mt-4">
              {lesson.qna.length > 0 ? (
                lesson.qna.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-bold">{item.question}</p>
                    <p className="text-sm text-gray-700">{item.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-700">No questions asked yet.</p>
              )}
            </div>
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
            {lesson.downloadFile ? (
              <a
                href={lesson.downloadFile}
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
                download
              >
                Download Lesson Files
              </a>
            ) : (
              <p className="text-sm text-gray-700">No files available for download.</p>
            )}
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
            <p className="text-sm text-gray-700">No announcements at this time.</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full p-4 h-[calc(100%-40px)] overflow-y-auto">
      {renderContent()}
    </div>
  );
}
