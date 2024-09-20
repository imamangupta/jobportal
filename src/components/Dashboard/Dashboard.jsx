// Dashboard.jsx
"use client";
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const profileData = [
  { name: 'Application Answered', value: 90 },
  { name: 'Interviewed', value: 60 },
  { name: 'Hired', value: 40 },
];

const jobDetailsData = [
  { name: 'Jan', Application: 40, Rejected: 55, Viewed: 50 },
  { name: 'Feb', Application: 30, Rejected: 65, Viewed: 30 },
  { name: 'Mar', Application: 50, Rejected: 60, Viewed: 20 },
  { name: 'Apr', Application: 50, Rejected: 65, Viewed: 10 },
  { name: 'May', Application: 40, Rejected: 60, Viewed: 50 },
  { name: 'Jun', Application: 60, Rejected: 70, Viewed: 60 },
  { name: 'Jul', Application: 55, Rejected: 60, Viewed: 40 },
  { name: 'Aug', Application: 60, Rejected: 55, Viewed: 20 },
  { name: 'Sep', Application: 50, Rejected: 65, Viewed: 30 },
  { name: 'Oct', Application: 45, Rejected: 70, Viewed: 35 },
  { name: 'Nov', Application: 55, Rejected: 65, Viewed: 30 },
  { name: 'Dec', Application: 40, Rejected: 60, Viewed: 55 },
];

const popularJobs = [
  { title: 'Software Engineer', company: 'TCS', logo: '🟦' },
  { title: 'Data Scientist', company: 'Wipro', logo: '🔷' },
  { title: 'Product Manager', company: 'Infosys', logo: '🔶' },
  { title: 'UX Designer', company: 'HCL Technologies', logo: '🟥' },
  { title: 'DevOps Engineer', company: 'Tech Mahindra', logo: '🟩' },
  { title: 'Business Analyst', company: 'Cognizant', logo: '🟨' },
];

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [jobInsights, setJobInsights] = useState([]);

  useEffect(() => {
    // Simulated API call to fetch stats
    const fetchStats = () => {
      const newStats = [
        { icon: '💼', title: 'Total Applied Jobs', value: '10' },
        { icon: '📢', title: 'Applications Answered', value: '25' },
        { icon: '👥', title: 'Interviews Scheduled', value: '5' },
        { icon: '🎉', title: 'Job Offers', value: '2' },
      ];
      setStats(newStats);
    };

    // Simulated API call to fetch job market insights
    const fetchJobInsights = () => {
      const newInsights = [
        'IT sector in India is expected to grow by 8% in 2023',
        'Bengaluru remains the top city for tech jobs in India',
        'Remote work opportunities have increased by 22% since last year',
        'Data Science and AI roles are seeing a 30% increase in demand',
        'E-commerce and EdTech sectors are rapidly expanding in India',
      ];
      setJobInsights(newInsights);
    };

    fetchStats();
    fetchJobInsights();
  }, []);

  return (
    <div className="space-y-6 m-2">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-indigo-900 mb-6 "
      >
        Welcome to Your CodePathshala Dashboard
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow p-6 flex items-center space-x-4"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-gray-500">{stat.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Profile Strength and Job Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Strength */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Profile Strength</h3>
            <select className="border rounded px-2 py-1">
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={profileData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {profileData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#4F46E5', '#EF4444', '#F59E0B'][index % 3]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4">
            {profileData.map((item, index) => (
              <div key={item.name} className="text-center">
                <div
                  className={`w-3 h-3 rounded-full mx-auto mb-1`}
                  style={{ backgroundColor: ['#4F46E5', '#EF4444', '#F59E0B'][index] }}
                ></div>
                <p className="text-sm">{item.name}</p>
                <p className="font-semibold">{item.value}%</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Job Application Trends</h3>
            <select className="border rounded px-2 py-1">
              <option>Monthly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={jobDetailsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Application" stackId="1" stroke="#4F46E5" fill="#4F46E5" />
              <Area type="monotone" dataKey="Rejected" stackId="1" stroke="#EF4444" fill="#EF4444" />
              <Area type="monotone" dataKey="Viewed" stackId="1" stroke="#F59E0B" fill="#F59E0B" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4">
            {['Applications Sent', 'Rejected', 'Viewed'].map((item, index) => (
              <div key={item} className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full mr-2`}
                  style={{ backgroundColor: ['#4F46E5', '#EF4444', '#F59E0B'][index] }}
                ></div>
                <p className="text-sm">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Popular Job */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Popular Jobs in India</h3>
        <div className="space-y-4">
          {popularJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{job.logo}</div>
                <div>
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-indigo-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Job Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-xl font-semibold mb-4">Indian Job Market Insights</h3>
        <ul className="list-disc list-inside space-y-2">
          {jobInsights.map((insight, index) => (
            <li key={index}>{insight}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}