import CourseHome from "@/components/Course/CourseHome";
import CourseSection from "@/components/Course/CourseSection";
import NavBar from "@/components/NavBar";
import React from "react";

function page() {
  return (
    <div>
      <NavBar/>
      <CourseSection />
    </div>
  );
}

export default page;
