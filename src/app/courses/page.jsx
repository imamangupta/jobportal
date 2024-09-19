"use client"
import NavBar from "@/components/NavBar";
import CourseSection from "@/components/Course/CourseSection";
import Layout from "@/components/Course/Layout";
import Footer from "@/components/Footer";

function page() {
  return (
    <div>
      <NavBar/>
        <Layout>
      <div className="space-y-6">
      <CourseSection/>
      </div>
    </Layout>
        <Footer/>

    
    </div>
  );
}

export default page;
