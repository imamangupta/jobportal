"use client";

import React from "react";
import { Star } from "lucide-react";

const PopularCoursesCard = ({
  title,
  price,
  type,
  students,
  classes,
  rating,
  authorName,
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-purple-600 font-bold mb-4">${price}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">{type}</span>
        <span className="text-sm text-gray-600">{students} students</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">{classes} classes</span>
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span className="text-sm text-gray-600">{rating}</span>
        </div>
      </div>
      <p className="text-sm text-gray-700">By {authorName}</p>
    </div>
  </div>
);

const PopularCourses = () => {
  const PopularCoursesCardData = [
    {
      title: "Introduction to Web Development",
      price: 49.99,
      type: "Beginner",
      students: 1500,
      classes: 20,
      rating: 4.8,
      authorName: "John Doe",
    },
    {
      title: "Advanced React Techniques",
      price: 79.99,
      type: "Advanced",
      students: 800,
      classes: 25,
      rating: 4.9,
      authorName: "Jane Smith",
    },
    {
      title: "Python for Data Science",
      price: 69.99,
      type: "Intermediate",
      students: 1200,
      classes: 30,
      rating: 4.7,
      authorName: "Alex Johnson",
    },
  ];

  return (
    <section className="mt-36 bg-purple-500 py-16 px-4  sm:px-6 lg:px-8 lg:mt-2">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-6">
          Our Popular Courses
        </h2>
        <p className="text-white text-center max-w-3xl mx-auto mb-12">
          Discover our most sought-after courses designed to elevate your skills
          and advance your career. Join thousands of students already benefiting
          from our expert-led, industry-relevant programs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PopularCoursesCardData.map((data, i) => (
            <PopularCoursesCard key={i} {...data} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
