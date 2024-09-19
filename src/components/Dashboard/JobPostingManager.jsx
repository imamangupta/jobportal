'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusIcon, Pencil, Trash2 } from 'lucide-react'

const JobPostingManager = () => {
  const [jobPosts, setJobPosts] = useState([
    {
      id: "1",
      title: "Senior Full Stack Developer",
      company: "TechIndia Solutions",
      logoColor: "#64B5F6",
      location: "Bangalore, India",
      jobType: "Full-Time",
      workType: "Remote",
      experience: "5-7 Years",
      salary: "₹12,00,000 / year",
      description: "TechIndia Solutions is seeking a Senior Full Stack Developer to join our innovative team. You'll be responsible for developing and maintaining web applications using modern technologies.",
      qualifications: [
        "5-7 years of experience in full stack development",
        "Proficiency in React, Node.js, and MongoDB",
        "Experience with cloud platforms (AWS/Azure/GCP)",
        "Strong problem-solving and communication skills",
      ],
      responsibilities: [
        "Design and implement scalable web applications",
        "Collaborate with cross-functional teams to define and develop new features",
        "Optimize application for maximum speed and scalability",
        "Mentor junior developers and contribute to technical decision-making",
      ],
      attachments: [
        { title: "Job Description", image: "/placeholder.svg?height=200&width=300" },
        { title: "Company Benefits", image: "/placeholder.svg?height=200&width=300" },
      ],
      postedTime: "1d ago",
      applicants: "150 Applicants",
      tags: ["Full-time", "Remote", "5-7 Years", "React", "JavaScript", "CSS", "HTML"],
      jobFunction: "Development",
    },
  ])

  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [newJobPost, setNewJobPost] = useState({
    id: "",
    title: "",
    company: "",
    logoColor: "#000000",
    location: "",
    jobType: "",
    workType: "",
    experience: "",
    salary: "",
    description: "",
    qualifications: [""],
    responsibilities: [""],
    attachments: [{ title: "", image: "" }],
    postedTime: "",
    applicants: "",
    tags: [""],
    jobFunction: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewJobPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (index, field, value) => {
    setNewJobPost((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleAttachmentChange = (index, field, value) => {
    setNewJobPost((prev) => ({
      ...prev,
      attachments: prev.attachments.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addField = (field) => {
    setNewJobPost((prev) => ({
      ...prev,
      [field]: [...prev[field], field === 'attachments' ? { title: '', image: '' } : ''],
    }))
  }

  const addOrUpdateJobPost = () => {
    if (newJobPost.title && newJobPost.company) {
      if (editingId) {
        setJobPosts((prev) =>
          prev.map((post) => (post.id === editingId ? { ...newJobPost, id: editingId } : post))
        )
      } else {
        setJobPosts((prev) => [
          ...prev,
          { ...newJobPost, id: String(prev.length + 1) },
        ])
      }
      setNewJobPost({
        id: "",
        title: "",
        company: "",
        logoColor: "#000000",
        location: "",
        jobType: "",
        workType: "",
        experience: "",
        salary: "",
        description: "",
        qualifications: [""],
        responsibilities: [""],
        attachments: [{ title: "", image: "" }],
        postedTime: "",
        applicants: "",
        tags: [""],
        jobFunction: "",
      })
      setEditingId(null)
      setOpen(false)
    }
  }

  const editJobPost = (id) => {
    const postToEdit = jobPosts.find((post) => post.id === id)
    if (postToEdit) {
      setNewJobPost(postToEdit)
      setEditingId(id)
      setOpen(true)
    }
  }

  const deleteJobPost = (id) => {
    setJobPosts((prev) => prev.filter((post) => post.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Job Posting Manager</h2>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <PlusIcon className="mr-2 h-4 w-4" /> Create New Job Post
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Job Post' : 'Create New Job Post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Job Title</Label>
                <Input id="title" name="title" value={newJobPost.title} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" value={newJobPost.company} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="logoColor">Logo Color</Label>
                <Input id="logoColor" name="logoColor" type="color" value={newJobPost.logoColor} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" value={newJobPost.location} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="jobType">Job Type</Label>
                <Input id="jobType" name="jobType" value={newJobPost.jobType} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="workType">Work Type</Label>
                <Input id="workType" name="workType" value={newJobPost.workType} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input id="experience" name="experience" value={newJobPost.experience} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input id="salary" name="salary" value={newJobPost.salary} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="jobFunction">Job Function</Label>
                <Input id="jobFunction" name="jobFunction" value={newJobPost.jobFunction} onChange={handleInputChange} />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={newJobPost.description} onChange={handleInputChange} />
            </div>
            <div>
              <Label>Qualifications</Label>
              {newJobPost.qualifications.map((qual, index) => (
                <Input
                  key={index}
                  value={qual}
                  onChange={(e) => handleArrayInputChange(index, 'qualifications', e.target.value)}
                  className="mb-2"
                />
              ))}
              <Button type="button" onClick={() => addField('qualifications')} size="sm">Add Qualification</Button>
            </div>
            <div>
              <Label>Responsibilities</Label>
              {newJobPost.responsibilities.map((resp, index) => (
                <Input
                  key={index}
                  value={resp}
                  onChange={(e) => handleArrayInputChange(index, 'responsibilities', e.target.value)}
                  className="mb-2"
                />
              ))}
              <Button type="button" onClick={() => addField('responsibilities')} size="sm">Add Responsibility</Button>
            </div>
            <div>
              <Label>Attachments</Label>
              {newJobPost.attachments.map((att, index) => (
                <div key={index} className="flex space-x-2 mb-2">
                  <Input
                    value={att.title}
                    onChange={(e) => handleAttachmentChange(index, 'title', e.target.value)}
                    placeholder="Title"
                  />
                  <Input
                    value={att.image}
                    onChange={(e) => handleAttachmentChange(index, 'image', e.target.value)}
                    placeholder="Image URL"
                  />
                </div>
              ))}
              <Button type="button" onClick={() => addField('attachments')} size="sm">Add Attachment</Button>
            </div>
            <div>
              <Label>Tags</Label>
              {newJobPost.tags.map((tag, index) => (
                <Input
                  key={index}
                  value={tag}
                  onChange={(e) => handleArrayInputChange(index, 'tags', e.target.value)}
                  className="mb-2"
                />
              ))}
              <Button type="button" onClick={() => addField('tags')} size="sm">Add Tag</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postedTime">Posted Time</Label>
                <Input id="postedTime" name="postedTime" value={newJobPost.postedTime} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="applicants">Applicants</Label>
                <Input id="applicants" name="applicants" value={newJobPost.applicants} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <Button onClick={addOrUpdateJobPost}>{editingId ? 'Update Job Post' : 'Add Job Post'}</Button>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Experience</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.company}</TableCell>
              <TableCell>{post.location}</TableCell>
              <TableCell>{post.jobType}</TableCell>
              <TableCell>{post.experience}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => editJobPost(post.id)} className="mr-2">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteJobPost(post.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default JobPostingManager