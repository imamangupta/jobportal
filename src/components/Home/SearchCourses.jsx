import React from "react";
import Image from "next/image";
import { courseBenefit, sideCourseImg } from "@/utils/constanst";

const SearchCourses = () => {
  return (
    <div className="w-full h-[100dvh] flex flex-col  items-center justify-start gap-4 px-4 md:px-8 ">
      <h1 className="font-[700] text-zinc-800 text-[1.5rem] md:text-[2rem] text-center">
        Search Courses
      </h1>
      <div className="w-full max-w-[700px] flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-2 px-3 py-1 bg-slate-100 shadow-md w-full sm:w-auto">
          <svg width="24" height="24" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            name="searchCourse"
            id="searchCourse"
            placeholder="Search for over 50+ courses"
            className="h-[7dvh] w-full sm:w-[30dvw] rounded border-none outline-none bg-transparent text-[1rem] text-zinc-900 px-2 font-[500]"
          />
        </div>
        <button className="h-[8dvh] w-full sm:w-[7dvw] rounded text-[1rem] text-white p-2 font-[500] bg-purple-600">
          Search
        </button>
      </div>
      <div className="w-full flex flex-col lg:flex-row items-center justify-between px-4 md:px-10 lg:px-20 gap-8">
        <div className="flex items-center justify-center">
          <Image
            src={sideCourseImg}
            alt="sideImg"
            priority={true}
            height={300}
            width={300}
            className="w-[80%] md:w-[350px]"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-4 w-full">
          <h1 className="text-center lg:text-left font-[700] text-[1.8rem] md:text-[2rem] w-full lg:w-[30dvw]">
            <span className="text-purple-600">Benefits</span> From Our Online
            Learning
          </h1>
          <ul className="flex flex-col items-start justify-center gap-4">
            {courseBenefit.map((data, i) => (
              <li
                key={i}
                className="flex items-start justify-start gap-4 w-full"
              >
                <div className="p-2 rounded-full bg-purple-600 flex items-center justify-center">
                  {data.logo}
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <h2 className="font-[500] text-[1.1rem]">{data.title}</h2>
                  <p className="font-[400] text-[.8rem]">{data.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
