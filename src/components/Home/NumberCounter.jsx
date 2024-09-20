"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import CountUp to ensure client-side only rendering
const CountUp = dynamic(() => import("react-countup"), { ssr: false });

const NumberCounter = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after the component is rendered in the browser
    setMounted(true);
  }, []);

  // Only render the component on the client-side after it's mounted
  if (!mounted) {
    return (
      <div className="bg-[#0063ff] text-white py-12">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">0</p>
            <p>Expert tutors</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">0</p>
            <p>Hours content</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">0</p>
            <p>Subject and courses</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-3xl font-semibold">0</p>
            <p>Active students</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0063ff] text-white py-12">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp start={0} end={124} duration={3} />
          </p>
          <p>Job Listed</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={2456} separator="," suffix="+" duration={3} />
          </p>
          <p>Hours content</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={28} duration={3} />
          </p>
          <p>Subject and courses</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold">
            <CountUp end={127} separator="," suffix="+" duration={3} />
          </p>
          <p>Active students</p>
        </div>
      </div>
    </div>
  );
};

export default NumberCounter;
