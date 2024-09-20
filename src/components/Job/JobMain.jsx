'use client'

import React, { useState, useEffect, useCallback, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Search,
  MapPin,
  ChevronDown,
  LayoutGrid,
  LayoutList,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { BaseApiUrl } from "@/utils/constanst"


const JobCard = React.lazy(() => import("./JobCard"))

const filterCategories = [
  {
    name: "Job Type",
    options: ["All", "Full-Time", "Part-Time", "Contract", "Internship"],
  },
  { name: "Work Type", options: ["Remote", "Onsite", "Hybrid"] },
  { name: "Experience", options: ["Entry Level", "Mid Level", "Senior Level"] },
  {
    name: "Job Function",
    options: [
      "Design",
      "Development",
      "Product Management",
      "Data Science",
      "DevOps",
      "Marketing",
      "Human Resources",
      "Sales",
    ],
  },
]

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
]

const JobMain = () => {

  
  const [jobs, setJobs] = useState([])
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedFilters, setExpandedFilters] = useState({})
  const [selectedState, setSelectedState] = useState("")
  const [location, setLocation] = useState("")
  const [salaryRange, setSalaryRange] = useState([0, 3000000])
  const [view, setView] = useState("list")
  
  const router = useRouter()
  // const { jobtype } = router.query; 
  // console.log('jobtype',jobtype);

  const fetchJobPost = useCallback(async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/job`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()

      if (json && json.job) {
        setJobs(json.job)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }, [])

  useEffect(() => {
    fetchJobPost()
  }, [fetchJobPost])

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilters = Object.entries(filters).every(
      ([category, selectedOptions]) => {
        if (!selectedOptions || selectedOptions.length === 0) return true

        switch (category) {
          case "Job Type":
            return selectedOptions.includes(job.jobType) || selectedOptions.includes("All")
          case "Work Type":
            return selectedOptions.includes(job.workType)
          case "Experience":
            return selectedOptions.includes(job.experience)
          case "Job Function":
            return selectedOptions.includes(job.jobFunction)
          default:
            return true
        }
      }
    )

    const matchesLocation =
      !location ||
      job.location.toLowerCase().includes(location.toLowerCase())

    const jobSalary = parseInt(job.salary.replace(/[^0-9]/g, ""))
    const matchesSalary =
      jobSalary >= salaryRange[0] && jobSalary <= salaryRange[1]

    return matchesSearch && matchesFilters && matchesLocation && matchesSalary
  })

  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters }
      if (!updatedFilters[category]) {
        updatedFilters[category] = []
      }
      const index = updatedFilters[category].indexOf(value)
      if (index > -1) {
        updatedFilters[category].splice(index, 1)
      } else {
        updatedFilters[category].push(value)
      }
      if (updatedFilters[category].length === 0) {
        delete updatedFilters[category]
      }
      return updatedFilters
    })
  }

  const toggleFilterExpansion = (category) => {
    setExpandedFilters((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const clearFilters = () => {
    setFilters({})
    setSearchTerm("")
    setLocation("")
    setSelectedState("")
    setSalaryRange([0, 3000000])
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          Explore thousands of job opportunities with all the information you
          need.
        </p>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-md">
        <div className="relative flex-grow max-w-md">
          <Input
            type="text"
            placeholder="Search jobs, companies, or keywords"
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-grow max-w-xs">
            <Input
              type="text"
              placeholder="Bangalore, Koramangala"
              className="pl-10 pr-4 py-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Search
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter sidebar */}
        <div className="w-full h-fit md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Filter</h2>
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-green-500 hover:text-green-600"
            >
              Clear all
            </Button>
          </div>
          {filterCategories.map((category) => (
            <div key={category.name} className="mb-6">
              <h3
                className="font-semibold mb-2 flex items-center justify-between cursor-pointer text-gray-700"
                onClick={() => toggleFilterExpansion(category.name)}
              >
                {category.name}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    expandedFilters[category.name] ? "transform rotate-180" : ""
                  }`}
                />
              </h3>
              <AnimatePresence>
                {expandedFilters[category.name] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {category.options.map((option) => (
                      <div key={option} className="flex items-center mb-2">
                        <Checkbox
                          id={`${category.name}-${option}`}
                          checked={(filters[category.name] || []).includes(
                            option
                          )}
                          onCheckedChange={() =>
                            handleFilterChange(category.name, option)
                          }
                        />
                        <label
                          htmlFor={`${category.name}-${option}`}
                          className="ml-2 text-sm text-gray-600"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 text-gray-700">Salary Range</h3>
            <Slider
              min={0}
              max={3000000}
              step={10000}
              value={salaryRange}
              onValueChange={setSalaryRange}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatCurrency(salaryRange[0])}</span>
              <span>{formatCurrency(salaryRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Job listings */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center gap-4 mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Showing results: {filteredJobs.length} Jobs
            </h2>
            <div className="flex gap-2">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                onClick={() => setView("list")}
              >
                <LayoutList />
              </Button>
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                onClick={() => setView("grid")}
              >
                <LayoutGrid />
              </Button>
            </div>
          </div>
          <Suspense fallback={<div>Loading jobs...</div>}>
            <div
              className={`grid gap-4 ${
                view === "grid" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {filteredJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default JobMain