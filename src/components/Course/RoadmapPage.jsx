"use client"
import React, { useState } from 'react'
import { Download, Eye, CheckCircle } from 'lucide-react'

const roadmaps = [
  {
    id: 1,
    title: 'Web Development Roadmap',
    description: 'A comprehensive guide to becoming a full-stack web developer',
    pdfUrl: '/roadmaps/web-dev.pdf',
    milestones: [
      { id: 1, title: 'HTML & CSS Basics', completed: true },
      { id: 2, title: 'JavaScript Fundamentals', completed: true },
      { id: 3, title: 'React Framework', completed: false },
      { id: 4, title: 'Backend Development with Node.js', completed: false },
      { id: 5, title: 'Database Management', completed: false },
    ]
  },
  {
    id: 2,
    title: 'Data Science Roadmap',
    description: 'Your path to becoming a proficient data scientist',
    pdfUrl: '/roadmaps/data-science.pdf',
    milestones: [
      { id: 1, title: 'Python Programming', completed: true },
      { id: 2, title: 'Data Analysis with Pandas', completed: false },
      { id: 3, title: 'Machine Learning Basics', completed: false },
      { id: 4, title: 'Deep Learning and Neural Networks', completed: false },
      { id: 5, title: 'Big Data Technologies', completed: false },
    ]
  },
  {
    id: 3,
    title: 'Mobile App Development Roadmap',
    description: 'Guide to building cross-platform mobile applications',
    pdfUrl: '/roadmaps/mobile-dev.pdf',
    milestones: [
      { id: 1, title: 'JavaScript/TypeScript Fundamentals', completed: true },
      { id: 2, title: 'React Native Basics', completed: true },
      { id: 3, title: 'State Management (Redux)', completed: false },
      { id: 4, title: 'Native Modules and APIs', completed: false },
      { id: 5, title: 'App Store Deployment', completed: false },
    ]
  }
]

const RoadmapPage = () => {
  const [selectedRoadmap, setSelectedRoadmap] = useState(null)
  const [completedMilestones, setCompletedMilestones] = useState({})

  const handleView = (roadmap) => {
    setSelectedRoadmap(roadmap)
  }

  const handleDownload = (pdfUrl) => {
    // In a real application, implement the download logic here
    console.log(`Downloading ${pdfUrl}`)
  }

  const toggleMilestone = (roadmapId, milestoneId) => {
    setCompletedMilestones(prev => {
      const roadmapMilestones = prev[roadmapId] || []
      const updatedMilestones = roadmapMilestones.includes(milestoneId)
        ? roadmapMilestones.filter(id => id !== milestoneId)
        : [...roadmapMilestones, milestoneId]
      return { ...prev, [roadmapId]: updatedMilestones }
    })
  }

  const calculateProgress = (roadmap) => {
    const completed = (completedMilestones[roadmap.id] || []).length
    return Math.round((completed / roadmap.milestones.length) * 100)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Learning Roadmaps</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap) => (
          <div key={roadmap.id} className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">{roadmap.title}</h2>
            <p className="mb-4 text-gray-600">{roadmap.description}</p>
            <div className="mb-4">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">{calculateProgress(roadmap)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-purple-600"
                  style={{ width: `${calculateProgress(roadmap)}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => handleView(roadmap)}
                className="flex items-center text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                <Eye className="mr-2 h-5 w-5" /> View
              </button>
              <button
                onClick={() => handleDownload(roadmap.pdfUrl)}
                className="flex items-center text-green-600 transition-colors duration-200 hover:text-green-800"
              >
                <Download className="mr-2 h-5 w-5" /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedRoadmap && (
        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">{selectedRoadmap.title}</h2>
          <div className="mb-6 space-y-4">
            {selectedRoadmap.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
              >
                <span className="font-medium">{milestone.title}</span>
                <button
                  onClick={() => toggleMilestone(selectedRoadmap.id, milestone.id)}
                  className={`rounded-full p-1 ${
                    (completedMilestones[selectedRoadmap.id] || []).includes(milestone.id)
                      ? 'bg-green-100 text-green-600'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <CheckCircle className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedRoadmap(null)}
            className="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            Back to Roadmap List
          </button>
        </div>
      )}
    </div>
  )
}

export default RoadmapPage