"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, BookOpen, Clock, Star, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseCard({
  id,
  title,
  description,
  image,
  progress = 0,
  duration,
  lessons,
  rating,
  tags = [],
  difficulty,
  students,
  link,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColor = {
    Beginner: "bg-emerald-500",
    Intermediate: "bg-amber-500",
    Advanced: "bg-rose-500",
  };

  const router = useRouter()

  const goto=()=>{
    router.push(`/courses/${id}`)
    console.log("chutiya");
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-lg bg-white shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div onClick={goto} className="aspect-video relative overflow-hidden">
        <img  src={image} alt={title} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColor[difficulty]} text-white`}
          >
            {difficulty}
          </span>
          <span className="flex items-center text-sm text-gray-500">
            <Star className="w-4 h-4 mr-1 text-yellow-400" /> {rating}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" /> {duration}
          </span>
          <span className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" /> {Array.isArray(lessons) ? lessons.length : lessons} lessons
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" /> {students} students
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/courses/${id}`}>
  <button className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300">
    Start Now
  </button>
</Link>

      </div>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-purple-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 3 }}
      />
    </motion.div>
  );
}