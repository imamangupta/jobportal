import AboutUsDashboard from "@/components/AboutDashboard";
import FAQ from "@/components/FAQ";
import Home from "@/components/Home";
import PopularCourses from "@/components/PopularCourses";
import SearchCourses from "@/components/SearchCourses";
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
