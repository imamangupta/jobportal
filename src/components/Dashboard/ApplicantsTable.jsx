// app/components/ApplicantsTable.jsx
'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'

const ApplicantsTable = ({ jobId, onChatClick }) => {
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchApplicants = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BaseApiUrl}/app/jobid`, {
        method: 'GET',
        headers: {
          'jobid': jobId
        }
      });
      const json = await response.json();

      if (json) {
        console.log(json);
        setApplicants(json.app)
      }
      
      setIsLoading(false)
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
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
                  <TableCell>{applicant.userName}</TableCell>
                  <TableCell>{applicant.email}</TableCell>
                  <TableCell>{applicant.phone}</TableCell>
                  <TableCell>
                    <Button variant="link" onClick={() => window.open(`/resume/${applicant.studentId}`, '_blank')}>
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