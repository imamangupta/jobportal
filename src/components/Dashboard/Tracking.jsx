"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusIcon } from 'lucide-react'

const Tracking = () => {
  const [applications, setApplications] = useState([
    { id: 1, company: 'TechCorp India', position: 'Senior Developer', status: 'Applied', date: '2023-05-15' },
    { id: 2, company: 'InnoSoft Solutions', position: 'Full Stack Engineer', status: 'Interview', date: '2023-05-10' },
    { id: 3, company: 'DataTech Systems', position: 'Data Scientist', status: 'Rejected', date: '2023-05-05' },
  ])

  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewApplication((prev) => ({ ...prev, [name]: value }))
  }

  const addApplication = () => {
    if (newApplication.company && newApplication.position && newApplication.date) {
      setApplications((prev) => [
        ...prev,
        { id: prev.length + 1, ...newApplication },
      ])
      setNewApplication({ company: '', position: '', status: 'Applied', date: '' })
    }
  }

  const updateStatus = (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Application Tracking</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          name="company"
          placeholder="Company"
          value={newApplication.company}
          onChange={handleInputChange}
        />
        <Input
          name="position"
          placeholder="Position"
          value={newApplication.position}
          onChange={handleInputChange}
        />
        <Select
          name="status"
          value={newApplication.status}
          onChange={handleInputChange}
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </Select>
        <Input
          name="date"
          type="date"
          value={newApplication.date}
          onChange={handleInputChange}
        />
      </div>

      <Button onClick={addApplication} className="mb-6">
        <PlusIcon className="mr-2 h-4 w-4" /> Add Application
      </Button>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.company}</TableCell>
              <TableCell>{app.position}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.date}</TableCell>
              <TableCell>
                <Select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  )
}

export default Tracking