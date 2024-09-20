'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'

// Dummy data for demonstration
const dummyApplicants = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8901",
    coverLetterUrl: "https://example.com/coverletter1.pdf",
    resumeUrl: "https://example.com/resume1.pdf"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 987 654 3210",
    coverLetterUrl: "https://example.com/coverletter2.pdf",
    resumeUrl: "https://example.com/resume2.pdf"
  }
]

const ApplicantsTable = ({ jobId, onChatClick }) => {
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchApplicants = async () => {
    setIsLoading(true)
    try {
      // For demonstration, we're using dummy data
      // In a real application, you would fetch from the API
      // const response = await fetch(`${BaseApiUrl}/job/${jobId}/applicants`, {
      //   method: 'GET',
      // });
      // const json = await response.json();
      // setApplicants(json.applicants)

      // Simulating API call with setTimeout
      setTimeout(() => {
        setApplicants(dummyApplicants)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error fetching applicants:", error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplicants()
  }, [jobId])

  return (
    <div>
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center py-10"
        >
          Loading applicants...
        </motion.div>
      ) : (
        <AnimatePresence>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Cover Letter</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applicants.map((applicant) => (
                <motion.tr
                  key={applicant.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{applicant.fullName}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.phone}</TableCell>
                  <TableCell>
                    <Button variant="link" onClick={() => window.open(applicant.coverLetterUrl, '_blank')}>
                      View Cover Letter
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="link" onClick={() => window.open(applicant.resumeUrl, '_blank')}>
                      View Resume
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => onChatClick(applicant.id)}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </AnimatePresence>
      )}
    </div>
  )
}

export default ApplicantsTable