import React from "react";
import Image from "next/image";
import { courseBenefit, sideCourseImg } from "@/utils/constanst";

const SearchCourses = () => {
  return (
    <div className="bg-[#f8f3ff]  w-full h-[100dvh] flex flex-col items-center justify-center gap-4 mt-[3rem]">
      <h1 className="font-[700] text-zinc-800 text-[2rem]">Search Courses</h1>
      <div className="w-[max-content] h-[max-content] flex items-center justify-center gap-4">
        <div className="w-[max-content] h-[max-content] flex items-center justify-center gap-2 px-3 py-1 bg-slate-100 shadow-md">
          <svg width="24" height="24" fill="currentColor">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            name="searchCourse"
            id="searchCourse"
            placeholder="Search for over 50+ courses"
            className="h-[7dvh] w-[30dvw]  rounded border-none outline-none bg-transparent text-[1rem] text-zinc-900 px-2 font-[500]"
          />
        </div>
        <button className="h-[8dvh] w-[7dvw] rounded text-[1rem] text-white p-2 font-[500] bg-purple-600">
          Search
        </button>
      </div>
      <div className="w-full h-[max-content] flex items-center justify-between px-20">
        <div className="h-[max-content] w-[max-content] flex flex-col items-center justify-center">
          <Image
            src={sideCourseImg}
            alt="sideImg"
            priority={true}
            height={350}
            width={350}
          />
        </div>
        <div className="h-[max-content] w-[max-content] flex flex-col items-start justify-center gap-4">
          <h1 className="w-[30dvw] h-[15dvh] font-[700] text-[2rem]">
            <diff className="text-purple-600">Benefits</diff> From Our Online
            Learning
          </h1>
          <ul className="h-[max-content] w-[max-content] flex flex-col items-center justify-center gap-2">
            {courseBenefit.map((data, i) => {
              return (
                <li
                  key={i}
                  className="h-[max-content] w-[45dvw] flex items-center justify-center gap-4"
                >
                  <div className="h-[max-content] w-[max-content] flex items-center justify-center p-2 rounded-[50%] bg-purple-600">
                    {data.logo}
                  </div>
                  <div className="h-[max-content] w-[max-content] flex flex-col items-start justify-center gap-2">
                    <h2 className="font-[500] text-[1.2rem] ">{data.title}</h2>
                    <p className="font-[400] text-[.8rem] ">{data.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
