// components/VideoPlayer.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

export default function VideoPlayer({ lesson }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full"
    >
      <div className="relative pt-[56.25%] h-3/4">
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-purple-600 rounded-full p-4 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{lesson}</h3>
      </div>
    </motion.div>
  );
}
