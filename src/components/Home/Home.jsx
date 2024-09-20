"use client";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { SlideRight } from "../../utils/animation";


const Hero = () => {
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px] relative">
        {/* brand info */}
        <div className="flex flex-col justify-center py-14 md:pr-16 xl:pr-40 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.p
              variants={SlideRight(0.4)}
              initial="hidden"
              animate="visible"
              className="text-orange-600 uppercase font-semibold"
            >
              100% Satisfaction Guarantee
            </motion.p>
            <motion.h1
              variants={SlideRight(0.6)}
              initial="hidden"
              animate="visible"
              className="text-5xl font-semibold lg:text-5xl !leading-tight"
            >
              Bridging the Gap between <span className="text-[#20b9f1]">Learning and Earning!</span> 
            </motion.h1>
            <motion.p
              variants={SlideRight(0.8)}
              initial="hidden"
              animate="visible"
            >
             Don’t just learn—turn your new skills into a rewarding career. Our platform bridges the gap between education and employment, making it easy to find both learning resources and job opportunities in one place. Success is just a click away! 
            </motion.p>
            {/* button section */}
            <motion.div
              variants={SlideRight(1.0)}
              initial="hidden"
              animate="visible"
              className="flex gap-8 justify-center md:justify-start !mt-8 items-center"
            >
              <button className="primary-btn">Get Started</button>
              <button className="flex justify-end items-center gap-2 font-semibold">
                <span className="w-10 h-10 bg-[#0063ff]/15 rounded-full flex justify-center items-center">
                  <FaPlay className="text-[#0063ff]" />
                </span>
                See how it works
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            src="/assets/hero.png"
            alt=""
            className="w-[350px] h-auto md:w-[550px] xl:w-[700px]  "
          />
        </div>
      </div>
    </>
  );
};

export default Hero;
