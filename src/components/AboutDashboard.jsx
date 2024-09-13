"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AboutUsDashboard() {
  const chartData = {
    labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Students Enrolled",
        data: [5000, 15000, 25000, 35000, 50000, 71897],
        borderColor: "rgb(139, 92, 246)",
        backgroundColor: "rgba(139, 92, 246, 0.5)",
      },
      {
        label: "Job Placements",
        data: [2000, 7000, 12000, 18000, 22000, 24363],
        borderColor: "rgb(167, 139, 250)",
        backgroundColor: "rgba(167, 139, 250, 0.5)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Our Growth Over the Years",
      },
    },
  };

  const stats = [
    { name: "Students Taught", value: "71,897+", icon: UserGroupIcon },
    { name: "Courses Offered", value: "200+", icon: AcademicCapIcon },
    { name: "Job Placements", value: "24,363", icon: BriefcaseIcon },
    { name: "Avg. Course Rating", value: "4.8/5", icon: StarIcon },
  ];

  return (
    <div className="bg-[#f8f3ff]  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-purple-900 sm:text-4xl">
            About CodePathshala
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Empowering careers through innovative education and job
            opportunities since 2024
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 ">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-[hsla(0,0%,100%,1)]   rounded-lg px-6 py-5 text-center"
              >
                <stat.icon
                  className="mx-auto h-12 w-12 text-purple-600"
                  aria-hidden="true"
                />
                <p className="mt-5 text-3xl font-semibold text-purple-900">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{stat.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-purple-50 rounded-lg p-6">
          <Line options={chartOptions} data={chartData} />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              At CodePathshala, we're committed to bridging the gap between
              education and employment. Our mission is to provide high-quality,
              industry-relevant courses that not only educate but also prepare
              our students for successful careers in the ever-evolving tech
              landscape.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Our Approach
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                Expert-led, practical courses designed for real-world
                application
              </li>
              <li>
                Integrated job portal connecting students directly with top
                employers
              </li>
              <li>Personalized career support and mentorship programs</li>
              <li>Continuous curriculum updates to match industry demands</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 bg-purple-100 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            What Our Students Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Alex Johnson",
                role: "Software Developer",
                quote:
                  "Etech's courses were instrumental in helping me transition into tech. I landed my dream job within months of completing my course!",
              },
              {
                name: "Samantha Lee",
                role: "Data Analyst",
                quote:
                  "The job portal is a game-changer. It's how I connected with my current employer. Etech truly delivers on their promise.",
              },
              {
                name: "Michael Chen",
                role: "UX Designer",
                quote:
                  "The practical, project-based learning approach gave me a portfolio that truly impressed employers. Thank you, Etech!",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-600 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="text-purple-900 font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
