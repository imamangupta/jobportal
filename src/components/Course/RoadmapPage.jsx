"use client"

import React, { useState, useMemo } from 'react'
import { Download, Eye, CheckCircle, Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Toaster, toast } from 'sonner'

const roadmaps = [
  {
    id: 1,
    title: 'Web Development Roadmap',
    description: 'A comprehensive guide to becoming a full-stack web developer, covering both front-end and back-end technologies.',
    pdfUrl: '/assets/roadmaps/web-dev.pdf',
    milestones: [
      { id: 1, title: 'HTML & CSS Basics', completed: true },
      { id: 2, title: 'JavaScript Fundamentals', completed: true },
      { id: 3, title: 'React Framework', completed: false },
      { id: 4, title: 'Backend Development with Node.js', completed: false },
      { id: 5, title: 'Database Management', completed: false },
      { id: 6, title: 'Version Control with Git & GitHub', completed: false },
      { id: 7, title: 'RESTful APIs and GraphQL', completed: false },
      { id: 8, title: 'DevOps and Deployment', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Data Science Roadmap',
    description: 'Your path to becoming a proficient data scientist, focusing on data analysis, machine learning, and big data technologies.',
    pdfUrl: '/assets/roadmaps/data-analyst.pdf',
    milestones: [
      { id: 1, title: 'Python Programming', completed: true },
      { id: 2, title: 'Data Analysis with Pandas', completed: false },
      { id: 3, title: 'Machine Learning Basics', completed: false },
      { id: 4, title: 'Deep Learning and Neural Networks', completed: false },
      { id: 5, title: 'Big Data Technologies', completed: false },
      { id: 6, title: 'Data Visualization with Matplotlib & Seaborn', completed: false },
      { id: 7, title: 'Natural Language Processing (NLP)', completed: false },
      { id: 8, title: 'Model Deployment and MLOps', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Mobile App Development Roadmap',
    description: 'Guide to building cross-platform mobile applications using modern frameworks and best practices.',
    pdfUrl: '/assets/roadmaps/android.pdf',
    milestones: [
      { id: 1, title: 'JavaScript/TypeScript Fundamentals', completed: true },
      { id: 2, title: 'React Native Basics', completed: true },
      { id: 3, title: 'State Management (Redux)', completed: false },
      { id: 4, title: 'Native Modules and APIs', completed: false },
      { id: 5, title: 'App Store Deployment', completed: false },
      { id: 6, title: 'Performance Optimization', completed: false },
      { id: 7, title: 'Push Notifications and Analytics', completed: false },
      { id: 8, title: 'User Authentication & Security', completed: false },
    ],
  },
  {
    id: 4,
    title: 'AI Data Scientist Roadmap',
    description: 'Learn the skills needed to become an AI Data Scientist, from machine learning to deep learning and model deployment.',
    pdfUrl: '/assets/roadmaps/ai-data-scientist.pdf',
    milestones: [
      { id: 1, title: 'Introduction to AI and Machine Learning', completed: false },
      { id: 2, title: 'Data Preprocessing and Feature Engineering', completed: false },
      { id: 3, title: 'Supervised and Unsupervised Learning', completed: false },
      { id: 4, title: 'Deep Learning with TensorFlow and PyTorch', completed: false },
      { id: 5, title: 'Computer Vision and Image Recognition', completed: false },
      { id: 6, title: 'Natural Language Processing (NLP) and Text Analytics', completed: false },
      { id: 7, title: 'Model Evaluation and Hyperparameter Tuning', completed: false },
      { id: 8, title: 'AI Ethics and Bias Mitigation', completed: false },
    ],
  },
  {
    id: 5,
    title: 'Cyber Security Roadmap',
    description: 'Become a cybersecurity expert with this roadmap covering network security, ethical hacking, and incident response.',
    pdfUrl: '/assets/roadmaps/cyber-security.pdf',
    milestones: [
      { id: 1, title: 'Introduction to Cyber Security', completed: false },
      { id: 2, title: 'Network Security Fundamentals', completed: false },
      { id: 3, title: 'Ethical Hacking and Penetration Testing', completed: false },
      { id: 4, title: 'Cryptography and Encryption', completed: false },
      { id: 5, title: 'Security Operations and Incident Response', completed: false },
      { id: 6, title: 'Web Application Security', completed: false },
      { id: 7, title: 'Threat Intelligence and Malware Analysis', completed: false },
      { id: 8, title: 'Compliance and Security Frameworks', completed: false },
    ],
  },
  {
    id: 6,
    title: 'UI and UX Design Roadmap',
    description: 'Master the principles of user interface and user experience design, from wireframing to interactive prototyping.',
    pdfUrl: '/assets/roadmaps/ux-design.pdf',
    milestones: [
      { id: 1, title: 'Introduction to UI/UX Design', completed: false },
      { id: 2, title: 'Wireframing and Prototyping', completed: false },
      { id: 3, title: 'Design Systems and Component Libraries', completed: false },
      { id: 4, title: 'User Research and Persona Development', completed: false },
      { id: 5, title: 'Usability Testing and Iteration', completed: false },
      { id: 6, title: 'Visual Design and Typography', completed: false },
      { id: 7, title: 'Interaction Design and Animations', completed: false },
      { id: 8, title: 'Accessibility and Inclusive Design', completed: false },
    ],
  },
];

const RoadmapPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [completedMilestones, setCompletedMilestones] = useState({})
  const [isDownloading, setIsDownloading] = useState(false)

  const filteredRoadmaps = useMemo(() => {
    return roadmaps.filter(roadmap =>
      roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      roadmap.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  const handleDownload = async (pdfUrl, title) => {
    setIsDownloading(true)
    try {
      const response = await fetch(pdfUrl)
      if (response.status === 404) {
        throw new Error('PDF file not found. Please contact the administrator.')
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const blob = await response.blob()
      if (blob.size === 0) {
        throw new Error('The downloaded file is empty')
      }
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${title.replace(/\s+/g, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success('Download Successful', {
        description: `${title} PDF has been downloaded.`,
      })
    } catch (error) {
      console.error('Download error:', error)
      toast.error('Download Failed', {
        description: error.message || `There was an error downloading the ${title} PDF. Please try again or contact support.`,
      })
    } finally {
      setIsDownloading(false)
    }
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
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      {/* <Toaster position="top-center" /> */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Learning Roadmaps</h1>
        
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search roadmaps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <X size={20} />
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoadmaps.map((roadmap) => (
            <div key={roadmap.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-gray-800">{roadmap.title}</h2>
                <p className="text-gray-600 mb-4 h-20 overflow-hidden">{roadmap.description}</p>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-700">{calculateProgress(roadmap)}%</span>
                  </div>
                  <Progress value={calculateProgress(roadmap)} className="w-full h-2" />
                </div>
              </div>
              <div className=" px-6 py-4 flex justify-between items-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto mb-2 sm:mb-0">
                      <Eye className="mr-2 h-4 w-4" /> View Milestones
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{roadmap.title}</DialogTitle>
                      <DialogDescription>Track your progress through the milestones.</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      {roadmap.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
                        >
                          <span className="font-medium">{milestone.title}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleMilestone(roadmap.id, milestone.id)}
                            className={
                              (completedMilestones[roadmap.id] || []).includes(milestone.id)
                                ? 'text-green-600'
                                : 'text-gray-400'
                            }
                          >
                            <CheckCircle className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownload(roadmap.pdfUrl, roadmap.title)}
                  disabled={isDownloading}
                  className="w-full sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" /> 
                  {isDownloading ? 'Downloading...' : 'Download PDF'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RoadmapPage