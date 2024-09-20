"use client";
import { FAQData } from "@/utils/constanst";
import React, { useState } from "react";

const FAQ = () => {
  const [openTab, setOpenTab] = useState(null); // Keep track of which tab is open

  const handletab = (i) => {
    setOpenTab(openTab === i ? null : i); // Toggle between open and close
  };

  return (
    <div className="w-full h-full bg-white flex flex-col lg:flex-row items-center justify-between gap-6 px-6 lg:px-20 py-10" id="FAQ">
      {/* Left Section */}
      <div className="w-full lg:w-[50%] flex flex-col items-start gap-6 lg:gap-[2rem]">
        <h1 className="font-[700] text-[2rem] lg:text-[4rem] w-full lg:w-[90%] leading-tight">
        Any questions? we Got you:-
        </h1>
        <p className="font-[500] text-[1rem] lg:text-[1.2rem] w-full lg:w-[90%]">
        Got questions? We got answers! Our dedicated support team is here to help with any inquiries you have about courses, enrollment, or anything else. Reach out anytime, and well make sure you get the information you need 
        </p>
        <button className="w-[max-content] h-[max-content] text-purple-600 font-[500] flex items-center justify-center gap-2">
          More FAQs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
            />
          </svg>
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[50%] flex flex-col items-center">
        <ul className="w-full flex flex-col gap-4">
          {FAQData.map((data, i) => {
            return (
              <li key={i} className="w-full p-4 border-b-2 border-gray-300">
                <div className="flex items-center justify-between">
                  <h2 className="font-[500] text-[1.2rem]">{data.question}</h2>
                  <button
                    onClick={() => handletab(i)}
                    className="font-[500] text-purple-600"
                  >
                    {openTab === i ? "Close" : "Open"}
                  </button>
                </div>
                {openTab === i && (
                  <p className="mt-2 text-[1rem] font-[400]">{data.answer}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FAQ;
