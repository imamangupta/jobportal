"use client";
import CourseHome from "@/components/Course/CourseHome";
import Layout from "@/components/Course/Layout";
import NavBar from "@/components/NavBar";

// Adjust the path if needed

export default function CoursePage() {
  return (
    <div>
      <NavBar />
      <Layout>
        <div className="space-y-6">
          <CourseHome />
        </div>
      </Layout>
    </div>
  );
}
