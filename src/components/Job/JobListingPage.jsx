"use client";

import { useEffect, useState } from "react";
import JobDescription from "./JobDescription";
import SimilarJobs from "./SimilarJobs";
import { Toaster } from "@/components/ui/toaster";
import { useParams } from 'next/navigation'
import { BaseApiUrl } from "@/utils/constanst";

// const jobData = [
//   {
//     id: "1",
//     title: "Senior Full Stack Developer",
//     company: "TechIndia Solutions",
//     location: "Bangalore, India",
//     type: "Full-time",
//     experience: "5-7 Years",
//     tags: ["Full-time", "Remote", "5-7 Years"],
//     description:
//       "TechIndia Solutions is seeking a Senior Full Stack Developer to join our innovative team. You'll be responsible for developing and maintaining web applications using modern technologies.",
//     qualifications: [
//       "5-7 years of experience in full stack development",
//       "Proficiency in React, Node.js, and MongoDB",
//       "Experience with cloud platforms (AWS/Azure/GCP)",
//       "Strong problem-solving and communication skills",
//     ],
//     responsibilities: [
//       "Design and implement scalable web applications",
//       "Collaborate with cross-functional teams to define and develop new features",
//       "Optimize application for maximum speed and scalability",
//       "Mentor junior developers and contribute to technical decision-making",
//     ],
//     attachments: [
//       {
//         title: "Job Description",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//       {
//         title: "Company Benefits",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//     ],
//     postedTime: "2 days ago",
//     applicants: "150 Applicants",
//   },
//   {
//     id: "2",
//     title: "UI/UX Designer",
//     company: "InnovateApp India",
//     location: "Mumbai, India",
//     type: "Full-time",
//     experience: "3-5 Years",
//     tags: ["Full-time", "On-site", "3-5 Years"],
//     description:
//       "InnovateApp India is looking for a talented UI/UX Designer to create amazing user experiences. You will work on cutting-edge mobile and web applications.",
//     qualifications: [
//       "3-5 years of experience in UI/UX design",
//       "Proficiency in design tools like Figma and Adobe XD",
//       "Strong portfolio demonstrating UI/UX projects",
//       "Understanding of user-centered design principles",
//     ],
//     responsibilities: [
//       "Create user-centered designs by understanding business requirements",
//       "Create user flows, wireframes, prototypes and mockups",
//       "Translate requirements into style guides, design systems, design patterns and attractive user interfaces",
//       "Collaborate with product managers and engineers to define and implement innovative solutions for the product direction, visuals and experience",
//     ],
//     attachments: [
//       {
//         title: "Design Process",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//       { title: "Team Culture", image: "/placeholder.svg?height=200&width=300" },
//     ],
//     postedTime: "1 week ago",
//     applicants: "89 Applicants",
//   },
//   {
//     id: "3",
//     title: "DevOps Engineer",
//     company: "CloudTech India",
//     location: "Hyderabad, India",
//     type: "Full-time",
//     experience: "4-6 Years",
//     tags: ["Full-time", "Hybrid", "4-6 Years"],
//     description:
//       "CloudTech India is seeking a skilled DevOps Engineer to help us optimize our cloud infrastructure and deployment processes.",
//     qualifications: [
//       "4-6 years of experience in DevOps practices",
//       "Strong knowledge of AWS or Azure cloud platforms",
//       "Experience with containerization (Docker) and orchestration (Kubernetes)",
//       "Proficiency in scripting languages (Python, Bash)",
//     ],
//     responsibilities: [
//       "Design and implement CI/CD pipelines",
//       "Manage and optimize cloud infrastructure",
//       "Implement security best practices and ensure compliance",
//       "Collaborate with development teams to improve deployment processes",
//     ],
//     attachments: [
//       { title: "Tech Stack", image: "/placeholder.svg?height=200&width=300" },
//       {
//         title: "Career Growth",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//     ],
//     postedTime: "3 days ago",
//     applicants: "72 Applicants",
//   },
//   {
//     id: "4",
//     title: "Data Scientist",
//     company: "AI Solutions India",
//     location: "Pune, India",
//     type: "Full-time",
//     experience: "2-4 Years",
//     tags: ["Full-time", "Remote", "2-4 Years"],
//     description:
//       "AI Solutions India is looking for a Data Scientist to join our team. You'll work on exciting projects involving machine learning and data analysis.",
//     qualifications: [
//       "2-4 years of experience in data science or related field",
//       "Strong background in machine learning and statistical modeling",
//       "Proficiency in Python and data analysis libraries (pandas, numpy, scikit-learn)",
//       "Experience with big data technologies (Hadoop, Spark) is a plus",
//     ],
//     responsibilities: [
//       "Develop machine learning models to solve complex business problems",
//       "Analyze large datasets to extract insights and drive decision-making",
//       "Collaborate with cross-functional teams to implement data-driven solutions",
//       "Stay up-to-date with the latest advancements in AI and machine learning",
//     ],
//     attachments: [
//       { title: "AI Projects", image: "/placeholder.svg?height=200&width=300" },
//       {
//         title: "Research Opportunities",
//         image: "/placeholder.svg?height=200&width=300",
//       },
//     ],
//     postedTime: "5 days ago",
//     applicants: "103 Applicants",
//   },
// ];

export default function JobListingPage() {
  const params = useParams()
  const [jobData, setJobData] = useState([])

  const fetchJobPost = async()=>{
    const response = await fetch(`${BaseApiUrl}/job/id`, {
      method: 'GET',
      headers: {
        'jobid':params.jobId
      }
    });
    const json = await response.json();

    if (json) {
      setJobData(json.job)
    }
  }

  useEffect(() => {
    fetchJobPost()
  }, [])
  
  
  // const [selectedJobId, setSelectedJobId] = useState("1");
  // const job = jobData.find((j) => j.id === selectedJobId) || jobData[0];
  // const similarJobs = jobData.filter((j) => j.id !== selectedJobId).slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <JobDescription job={jobData} />
        </div>
        <div>
          {/* <SimilarJobs jobs={similarJobs} onJobSelect={setSelectedJobId} /> */}
        </div>
      </div>
    </div>
  );
}
