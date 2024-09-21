'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageSquare, Star, BarChart, Loader2 } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ApplicantsTable({ jobId, onChatClick }) {
  const [applicants, setApplicants] = useState([])
  const [shortlistedApplicants, setShortlistedApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isShortlisted, setIsShortlisted] = useState(false)
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const fetchApplicants = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BaseApiUrl}/app/jobid`, {
        method: 'GET',
        headers: {
          'jobid': jobId
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch applicants')
      }
      const json = await response.json();

      if (json && json.app) {
        setApplicants(json.app)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error("Error fetching applicants:", error)
      toast.error("Failed to fetch applicants. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  const fetchAllAppData = useCallback(async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/app/getAppByJob`, {
        method: 'GET',
        headers: {
          'jobid': jobId
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch all applicant data')
      }
      const json = await response.json();

      if (json && json.data) {
        return json.data;
      } else {
        throw new Error('Invalid response format')
      }
    } catch (error) {
      console.error("Error fetching all applicant data:", error)
      toast.error("Failed to fetch all applicant data. Please try again.")
      return null;
    }
  }, [jobId])
  useEffect(() => {
    fetchApplicants()
  }, [fetchApplicants])

  const calculateScore = useCallback((applicant) => {
    let score = 0;
    
    // Experience score
    const experienceYears = applicant.experience.reduce((total, exp) => {
      const duration = exp.duration.split(' - ');
      const startYear = new Date(duration[0]).getFullYear();
      const endYear = duration[1] === 'Present' ? new Date().getFullYear() : new Date(duration[1]).getFullYear();
      return total + (endYear - startYear);
    }, 0);
    score += experienceYears * 5;

    // Education score
    const degree = applicant.education[0].degree.toLowerCase();
    if (degree.includes('bachelor')) {
      score += 10;
    } else if (degree.includes('master')) {
      score += 15;
    } else if (degree.includes('phd')) {
      score += 20;
    }

    // Skills score
    const relevantSkills = ['react', 'javascript', 'html', 'css', 'node', 'typescript', 'nextjs', 'graphql', 'rest api', 'vue', 'angular', 'python', 'java', 'c#', 'php'];
    applicant.skills.forEach(skill => {
      if (relevantSkills.some(rs => skill.toLowerCase().includes(rs))) {
        score += 2;
      }
    });

    // Relevant job titles score
    const relevantTitles = ['developer', 'engineer', 'programmer', 'coder', 'software', 'frontend', 'backend', 'fullstack'];
    applicant.experience.forEach(exp => {
      if (relevantTitles.some(rt => exp.position.toLowerCase().includes(rt))) {
        score += 3;
      }
    });

    return score;
  }, [])

  const shortlistTopCandidates = useCallback(async () => {
    setIsLoading(true);
    const allAppData = await fetchAllAppData();
    if (!allAppData) {
      setIsLoading(false);
      return;
    }

    const scoredApplicants = allAppData.map(applicant => ({
      ...applicant.data[0],
      score: calculateScore(applicant.data[0])
    }));

    const sortedApplicants = scoredApplicants.sort((a, b) => b.score - a.score);
    
    let topApplicants;
    if (sortedApplicants.length > 10) {
      topApplicants = sortedApplicants.slice(0, 10);
    } else if (sortedApplicants.length >= 3) {
      topApplicants = sortedApplicants.slice(0, 3);
    } else {
      topApplicants = sortedApplicants.slice(0, 1);
    }
    console.log(topApplicants);
    setShortlistedApplicants(topApplicants);
    setIsShortlisted(true);
    setAnalysis(null);
    setIsLoading(false);
    
    toast.success(`Top ${topApplicants.length} candidates have been shortlisted.`);
  }, [fetchAllAppData, calculateScore])

  const resetShortlist = useCallback(() => {
    setIsShortlisted(false);
    setAnalysis(null);
    toast.success("Showing all applicants.");
  }, [])

  const performAnalysis = useCallback(async () => {
    setIsAnalyzing(true);
    const allAppData = await fetchAllAppData();
    if (!allAppData) {
      setIsAnalyzing(false);
      return;
    }

    const applicants = allAppData.map(app => app.data[0]);
    
    // Calculate average experience
    const totalExperience = applicants.reduce((total, app) => {
      return total + app.experience.reduce((expTotal, exp) => {
        const duration = exp.duration.split(' - ');
        const startYear = new Date(duration[0]).getFullYear();
        const endYear = duration[1] === 'Present' ? new Date().getFullYear() : new Date(duration[1]).getFullYear();
        return expTotal + (endYear - startYear);
      }, 0)
    }, 0);
    const averageExperience = totalExperience / applicants.length;

    // Count average skills
    const totalSkills = applicants.reduce((total, app) => total + app.skills.length, 0);
    const averageSkills = totalSkills / applicants.length;

    // Analyze education levels
    const educationLevels = applicants.reduce((levels, app) => {
      const degree = app.education[0].degree.toLowerCase();
      if (degree.includes('bachelor')) levels.bachelor++;
      else if (degree.includes('master')) levels.master++;
      else if (degree.includes('phd')) levels.phd++;
      else levels.other++;
      return levels;
    }, { bachelor: 0, master: 0, phd: 0, other: 0 });

    // Analyze relevant experience
    const relevantExperience = applicants.reduce((total, app) => {
      return total + app.experience.filter(exp => 
        exp.position.toLowerCase().includes('developer') || 
        exp.description.toLowerCase().includes('react')
      ).length;
    }, 0);

    // Top skills
    const skillFrequency = applicants.reduce((freq, app) => {
      app.skills.forEach(skill => {
        freq[skill] = (freq[skill] || 0) + 1;
      });
      return freq;
    }, {});
    const topSkills = Object.entries(skillFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));

    setAnalysis({
      averageExperience: averageExperience.toFixed(1),
      averageSkills: averageSkills.toFixed(1),
      educationLevels,
      relevantExperience,
      topSkills,
      totalApplicants: applicants.length
    })
    setIsAnalyzing(false);
    
    toast.success("Applicant data has been analyzed.");
  }, [fetchAllAppData])

  const displayedApplicants = isShortlisted ? shortlistedApplicants : applicants;
  const router = useRouter();
  const gotodashboard =()=>{
    router.push('/dashboard?nav=Message')
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button onClick={shortlistTopCandidates} className="bg-primary text-primary-foreground" disabled={isLoading || isAnalyzing}>
          <Star className="mr-2 h-4 w-4" />
          Shortlist Top Candidates
        </Button>
        {isShortlisted && (
          <Button onClick={resetShortlist} variant="outline" disabled={isLoading || isAnalyzing}>
            View All Applicants
          </Button>
        )}
        <Button onClick={performAnalysis} variant="outline" disabled={isLoading || isAnalyzing}>
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <BarChart className="mr-2 h-4 w-4" />
              Analyze Applicants
            </>
          )}
        </Button>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Applicants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analysis.totalApplicants}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analysis.averageExperience} years</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analysis.averageSkills}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Education Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                <li>Bachelor: {analysis.educationLevels.bachelor}</li>
                <li>Master: {analysis.educationLevels.master}</li>
                <li>PhD: {analysis.educationLevels.phd}</li>
                <li>Other: {analysis.educationLevels.other}</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Relevant Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analysis.relevantExperience} positions</p>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Top Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {analysis.topSkills.map(({ skill, count }) => (
                  <li key={skill}>
                    {skill}: {count} applicants
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center py-10"
        >
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading applicants...</span>
        </motion.div>
      ) : displayedApplicants.length > 0 ? (
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
              {displayedApplicants.map((applicant, index) => (
                <motion.tr
                  key={applicant.email || index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TableCell>{applicant.userName || applicant.personalInfo.name}</TableCell>
                  <TableCell>{applicant.email || applicant.personalInfo.email}</TableCell>
                  <TableCell>{applicant.phone || applicant.personalInfo.phone}</TableCell>
                  <TableCell><Link href={`/resume/${applicant.studentId}`} target='_blank'>
                    <Button variant="link">View Resume</Button>
                    </Link></TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => {
                      onChatClick(applicant.email)
                      gotodashboard()}}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat Now
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </AnimatePresence>
      ) : (
        <div className="text-center py-10 text-gray-500">
          No applicants found. Try adjusting your filters or shortlisting criteria.
        </div>
      )}
    </div>

  )
}