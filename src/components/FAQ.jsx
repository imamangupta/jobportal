"use client";
import { FAQData } from "@/utils/constanst";
import React, { useState } from "react";

const FAQ = () => {
  const [openTab, setOpenTab] = useState(null); // Keep track of which tab is open

  const handletab = (i) => {
    setOpenTab(openTab === i ? null : i); // Toggle between open and close
  };

  return (
    <div className="w-full h-[100dvh] bg-[#f8f3ff] flex items-center justify-between gap-2 px-20">
      <div className="w-[50%] h-[max-content] flex flex-col items-start justify-evenly gap-[2rem] p-2">
        <h1 className="font-[700] text-[4rem] w-[90%] leading-[1.2]">
          Any questions? We got you.
        </h1>
        <p className="font-[500] text-[1rem] w-[90%]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis,
          consequuntur. Similique adipisci ullam hic delectus. Quas commodi
          ullam aliquam eum. Lorem ipsum dolor sit amet.
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
      <div className="w-[50%] h-[max-content] flex flex-col items-center justify-center">
        <ul className="w-full h-[max-content] flex flex-col items-center justify-center gap-[1rem] p-2">
          {FAQData.map((data, i) => {
            return (
              <li
                key={i}
                className="w-full h-[max-content] flex flex-col items-center justify-center gap-[1rem] p-2"
                style={{ borderBottom: "2px solid gray" }}
              >
                <div className="w-full h-[max-content] flex items-center justify-between">
                  <h2 className="font-[500] text-[1.2rem]">{data.question}</h2>
                  <button onClick={() => handletab(i)}>
                    {openTab === i ? "Close" : "Open"}
                  </button>
                </div>
                {openTab === i && (
                  <p className="font-[400] text-[1rem]">{data.answer}</p>
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
