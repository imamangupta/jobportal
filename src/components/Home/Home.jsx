"use client";

import { Play } from "lucide-react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Home = () => {
  const logoContainerRef = useRef(null);

  useEffect(() => {
    const logos = logoContainerRef.current;
    const containerWidth = logos.scrollWidth / 2; // Only calculate half since we duplicate logos

    // Duplicating the logo elements to prevent blank space during scroll
    const clone = logos.innerHTML;
    logos.innerHTML += clone;

    gsap.to(logos, {
      x: `-${containerWidth}px`,
      duration: 20, // Adjust the duration to control scroll speed
      ease: "linear",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % containerWidth}px`, // Modifies x to loop without gaps
      },
    });
  }, []);

  return (
    <div className="bg-[#f8f3ff] w-full h-screen overflow-hidden">
      <main className="flex flex-col md:flex-row items-center    justify-between p-6 md:p-8 lg:p-12 max-w-7xl h-[75%] mx-auto">
        <div className="md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Develop your skills in a new and unique way
          </h1>
          <p className="text-gray-600 max-w-md mx-auto md:mx-0">
            Explore a transformative approach to skill development on our online
            learning platform. Uncover a new realm of learning experiences and
            elevate your expertise in unique ways.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition">
              Enroll Now
            </button>
            <button className="border border-purple-500 text-purple-500 px-6 py-3 rounded-lg font-semibold hover:bg-purple-500 hover:text-white transition flex items-center">
              <Play className="mr-2 h-4 w-4" />
              What's Etech?
            </button>
          </div>
        </div>

        <div className="md:w-1/2 relative mt-8 md:mt-0 ">
          <img
            src="https://imgs.search.brave.com/_dq22rt03-YaZd1zfIli_Nx7-Tqv7n7dwS3x9xXIh1M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTcvU3R1/ZGVudC1QTkctSEQu/cG5n"
            alt="Student"
            width={800}
            height={800}
            className="rounded-full w-[80%] md:w-[350px] lg:w-[500px] xl:w-[600px] mx-auto md:mx-0"
          />

          {/* Fixing overlay positions with proper scaling
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:left-16 md:transform md:-translate-x-8 -translate-y-8 bg-white rounded-lg shadow-lg p-4">
            <p className="text-purple-600 font-semibold">50+ Online Courses</p>
          </div> */}

          {/* <div className="absolute bottom-36 left-1/2 transform -translate-x-1/2  md:right-32 md:left-auto md:translate-x-8 translate-y-8 bg-white rounded-lg shadow-lg p-4">
            <p className="text-purple-600 font-semibold">10k+ Online Students</p>
          </div> */}

          {/* <div className="absolute bottom-10 left-0 transform translate-y-8 bg-white rounded-lg shadow-lg p-4">
            <span className="flex items-center justify-center gap-4"><p className="text-purple-600 font-semibold">UI Design Class</p>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition mt-2">
              Join now
            </button></span>
          </div> */}
        </div>
      </main>

      <footer className="bg-gradient-to-t from-pink-400 to-purple-500 py-6">
        <div className="flex overflow-hidden">
          <div
            ref={logoContainerRef}
            className="flex justify-center space-x-7 container  px-4 items-center"
          >
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
            <img
              className="object-contain w-36 sm:w-44"
              src="/assets/Duolingo_logo.svg"
              alt="Duolingo"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
