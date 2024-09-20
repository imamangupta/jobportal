"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import CourseCard from "./CourseCard";
import { courses } from "@/utils/courses"; 

// ... FilterOption component remains unchanged

export default function CourseSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    difficulty: [],
    tags: [],
  });
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const handleFilterChange = (filterType, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(option)
        ? prevFilters[filterType].filter((item) => item !== option)
        : [...prevFilters[filterType], option],
    }));
  };

  useEffect(() => {
    const newFilteredCourses = courses.filter(
      (course) =>
        (course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) &&
        (filters.difficulty.length === 0 ||
          filters.difficulty.includes(course.difficulty)) &&
        (filters.tags.length === 0 ||
          course.tags.some((tag) => filters.tags.includes(tag)))
    );
    setFilteredCourses(newFilteredCourses);
  }, [searchTerm, filters]);

  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Premium Courses
        </h2>
        {/* ... search and filter UI remains unchanged */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}