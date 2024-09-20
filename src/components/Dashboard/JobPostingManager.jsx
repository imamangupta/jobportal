'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PlusIcon, Pencil, Trash2 } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'
import CreateJob from './component/CreateJob'

const JobPostingManager = ({data}) => {
  // console.log('jobpostingmamadk',data);
  
  const [jobPosts, setJobPosts] = useState([])



  

 


 

  const fetchjobUser = async()=>{
    const response = await fetch(`${BaseApiUrl}/job/userid`, {
      method: 'GET',
      headers: {
        'jobid':data._id
      }
    });
    const json = await response.json();

    if (json) {
      console.log(json);
      setJobPosts(json.job)
     
    }
  }

  useEffect(() => {
    fetchjobUser()
  }, [])
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Job Posting Manager</h2>

      <CreateJob data={data}/>
   

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