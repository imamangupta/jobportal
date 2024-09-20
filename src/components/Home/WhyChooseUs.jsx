"use client"
import React from "react";
import { IoIosDocument } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { SlideLeft } from "../../utils/animation";

const WhyChooseData = [
  {
    id: 1,
    title: "Resume Optimization Tool",
    desc: "Unlock your full potential with our AI-powered Resume Builder, designed to help you create a standout professional profile tailored to your career goals. ",
    icon: <IoIosDocument />,
    bgColor: "#0063ff",
    delay: 0.3,
  },
  {
    id: 2,
    title: "Courses for All Fields ",
    desc: "Explore our diverse range of courses designed to cater to a wide array of disciplines and interests. ",
    link: "/",
    icon: <FaVideo />,
    bgColor: "#73bc00",
    delay: 0.6,
  },
  {
    id: 3,
    title: "Job Portal for All Professions ",
    desc: "Welcome to our comprehensive job portal designed to connect talented individuals with diverse career opportunities across all professions.",
    link: "/",
    icon: <MdWork/>,
    bgColor: "#fa6400",
    delay: 0.9,
  },
  {
    id: 4,
    title: "Career Roadmap ",
    desc: "Navigate your journey to success with our carefully crafted career roadmap, designed to guide you through every stage of your professional development. ",
    link: "/",
    icon: <RiRoadMapFill />,
    bgColor: "#fe6baa",
    delay: 0.9,
  },
];
const WhyChooseUs = () => {
  return (
    <div className="bg-white" id="why-choose-us">
      <div className="container py-24">
        {/* header section */}
        <div className="space-y-4 p-6 text-center max-w-[500px] mx-auto mb-5">
          <h1 className="uppercase font-semibold text-purple-800">
            Why Choose Us
          </h1>
          <p className="font-semibold text-3xl">
          Benefits of Choosing Our Online Platform 
          </p>
        </div>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {WhyChooseData.map((item) => {
            return (
              <motion.div
                key={item.id}
                variants={SlideLeft(item.delay)}
                initial="hidden"
                whileInView={"visible"}
                className="space-y-4 p-6 rounded-xl shadow-[0_0_22px_rgba(0,0,0,0.15)]"
              >
                {/* icon section */}
                <div
                  style={{ backgroundColor: item.bgColor }}
                  className="w-10 h-10 rounded-lg flex justify-center items-center text-white"
                >
                  <div className="text-2xl">{item.icon}</div>
                </div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
