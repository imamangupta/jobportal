import Footer from "@/components/Footer";
import JobListingPage from "@/components/Job/JobListingPage";
import NavBar from "@/components/NavBar";
import React from "react";

function page() {
  return (
    <div>
      <NavBar />
      <JobListingPage />
      <Footer />
    </div>
  );
}

export default page;
