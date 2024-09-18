"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import CourseCard from "./CourseCard";

const courses = [
  {
    title: "Ultimate JavaScript Course",
    description:
      "Master JavaScript from basics to advanced concepts. Includes ES6+, async programming, and more.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 75,
    duration: "20 hours",
    lessons: 150,
    rating: 4.9,
    tags: ["JavaScript", "Web Development"],
    difficulty: "Intermediate",
    students: 15000,
  },
  {
    title: "Sanity.io Tutorials in Hindi",
    description:
      "Learn Sanity.io, the ultimate content platform, with hands-on projects and real-world applications.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 50,
    duration: "15 hours",
    lessons: 100,
    rating: 4.7,
    tags: ["Sanity.io", "CMS", "Hindi"],
    difficulty: "Beginner",
    students: 8000,
  },
  {
    title: "Strapi Tutorial For Beginners",
    description:
      "Dive into Strapi, the open-source headless CMS. Build powerful APIs and manage content like a pro.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 25,
    duration: "12 hours",
    lessons: 80,
    rating: 4.8,
    tags: ["Strapi", "Headless CMS"],
    difficulty: "Beginner",
    students: 10000,
  },
  {
    title: "React Native Masterclass",
    description:
      "Build cross-platform mobile apps with React Native. From setup to deployment, cover it all.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 10,
    duration: "25 hours",
    lessons: 200,
    rating: 4.9,
    tags: ["React Native", "Mobile Development"],
    difficulty: "Advanced",
    students: 12000,
  },
  {
    title: "GraphQL Advanced Concepts",
    description:
      "Take your GraphQL skills to the next level. Learn about resolvers, directives, and more.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 10,
    duration: "18 hours",
    lessons: 120,
    rating: 4.7,
    tags: ["GraphQL", "API"],
    difficulty: "Advanced",
    students: 7000,
  },
  {
    title: "Docker for Developers",
    description:
      "Master Docker containerization. From basic concepts to orchestration with Kubernetes.",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20215528-xArQW2gDDDRNBqXvWaYGydqggMXI4U.png",
    progress: 40,
    duration: "16 hours",
    lessons: 110,
    rating: 4.8,
    tags: ["Docker", "DevOps"],
    difficulty: "Intermediate",
    students: 9000,
  },
];

// const router = useRouter
// const handleRedirect = () => {
//   // Replace '/course-home' with the actual path of your course home page
//   router.push('/courses/course-home');
// };

const FilterOption = ({ label, options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        {label}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                checked={selectedOptions.includes(option)}
                onChange={() => onChange(option)}
              />
              <span className="ml-2">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

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
    <div className="bg-[#f8f3ff] py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Premium Courses
        </h2>
        <div className="mb-8 space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <FilterOption
              label="Difficulty"
              options={["Beginner", "Intermediate", "Advanced"]}
              selectedOptions={filters.difficulty}
              onChange={(option) => handleFilterChange("difficulty", option)}
            />
            <FilterOption
              label="Custom Tag"
              options={["JavaScript", "React", "GraphQL", "DevOps", "Mobile"]}
              selectedOptions={filters.tags}
              onChange={(option) => handleFilterChange("tags", option)}
            />
          </div>
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
