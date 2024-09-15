import Footer from "@/components/Footer";
import AboutUsDashboard from "@/components/Home/AboutDashboard";
import FAQ from "@/components/Home/FAQ";
import Home from "@/components/Home/Home";
import PopularCourses from "@/components/Home/PopularCourses";
import SearchCourses from "@/components/Home/SearchCourses";
import NavBar from "@/components/NavBar";
import React from "react";

function page() {
  return (
    <div>
      <NavBar/>
      <Home />
      <SearchCourses />
      <PopularCourses />
      <AboutUsDashboard />
      <FAQ />
      <Footer/>
    </div>
  );
}

export default page;
