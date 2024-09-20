'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Pencil, Trash2, Eye, MessageSquare } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'
import CreateJob from './component/CreateJob'
import ApplicantsTable from './ApplicantsTable'

const JobPostingManager = ({data}) => {
  const [jobPosts, setJobPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchjobUser = async() => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BaseApiUrl}/job/userid`, {
        method: 'GET',
        headers: {
          'userid': data.userId
        }
      });
      const json = await response.json();

      if (json) {
        console.log(json);
        setJobPosts(json.job)
      }
    } catch (error) {
      console.error("Error fetching job posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchjobUser()
  }, [])

  const editJobPost = (id) => {
    // Implement edit functionality
    console.log("Edit job post with id:", id)
  }

  const deleteJobPost = async (id) => {
    try {
      await fetch(`${BaseApiUrl}/job/${id}`, {
        method: 'DELETE',
        headers: {
          'userid': data.userId
        }
      });
      setJobPosts(jobPosts.filter(post => post.id !== id))
    } catch (error) {
      console.error("Error deleting job post:", error)
    }
  }

  const redirectToChat = (applicantId) => {
    // Implement chat redirection
    console.log("Redirect to chat with applicant id:", applicantId)
    // You can use Next.js router to redirect to the chat page
    // router.push(`/chat/${applicantId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Job Posting Manager</h2>

      <CreateJob data={data} onJobCreated={fetchjobUser} />

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-10"
        >
          Loading job posts...
        </motion.div>
      ) : (
        <AnimatePresence>
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
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.company}</TableCell>
                  <TableCell>{post.location}</TableCell>
                  <TableCell>{post.jobType}</TableCell>
                  <TableCell>{post.experience}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => editJobPost(post.id)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteJobPost(post.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Applicants
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Applicants for {post.title}</DialogTitle>
                          </DialogHeader>
                          <ApplicantsTable jobId={post.id} onChatClick={redirectToChat} />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </AnimatePresence>
      )}
    </motion.div>
  )
}

export default JobPostingManager