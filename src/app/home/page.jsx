import AboutUsDashboard from "@/components/Home/AboutDashboard";
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/Home";
import PopularCourses from "@/components/Home/PopularCourses";
import SearchCourses from "@/components/Home/SearchCourses";
import React from "react";

function page() {
  return (
    <div>
      <Home />
      <SearchCourses />
      <PopularCourses />
      <AboutUsDashboard />
      <FAQ />
    </div>
  );
}

export default page;
