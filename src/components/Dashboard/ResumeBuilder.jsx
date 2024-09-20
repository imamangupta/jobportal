"use client";
import React, { useEffect, useRef,useState } from 'react';
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusIcon, MinusIcon } from 'lucide-react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constanst';

const ResumeBuilder = ({data}) => {
  const router = useRouter()
  const [resume, setResume] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    summary: '',
    experience: [{ company: '', position: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '' }],
    skills: [''],
  })

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }))
  }

  const handleSummaryChange = (e) => {
    setResume((prev) => ({ ...prev, summary: e.target.value }))
  }

  const handleExperienceChange = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }))
  }

  const handleEducationChange = (index, field, value) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }))
  }

  const handleSkillChange = (index, value) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
    }))
  }

  const addExperience = () => {
    setResume((prev) => ({
      ...prev,
      experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }],
    }))
  }

  const removeExperience = (index) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }))
  }

  const addEducation = () => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '' }],
    }))
  }

  const removeEducation = (index) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const addSkill = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...prev.skills, ''],
    }))
  }

  const removeSkill = (index) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${BaseApiUrl}/resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userid: data.userId, data: resume })
    });
    const json = await response.json();
    console.log(data.userId,resume);
    
    if (json) {
      console.log( "working",json);
      
    
      router.push(`/resume/${data.userId}`)
    }
    
  }



  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/resume`, {
      method: 'GET',
      headers: {
        'userid':data.userId
      }
    });

  

    const json = await response.json();
    if (json) {
      if(json.resume.length !== 0){
        console.log(json.resume[0].data[0]);
        let newdata = json.resume[0].data[0]
  
        setResume({
          personalInfo: {
            name: newdata.personalInfo.name,
            email: newdata.personalInfo.email,
            phone: newdata.personalInfo.phone,
            location: newdata.personalInfo.location,
          },
          summary: newdata.summary,
          experience: newdata.experience,
          // experience: [{ company: '', position: '', duration: '', description: '' }],
          education: newdata.education,
          skills: newdata.skills,
        })
      }
     
    
 

      // dispatch(setUser(json.user));
    }
  }


  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto"
    >
      <div>
        <Link target='_blank' href={`/resume/${data.userId}`}><Button type="button" >
            View Resume
          </Button></Link>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Resume Builder</h2>
      <form onSubmit={handleSubmit}>
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={resume.personalInfo.name}
              onChange={handlePersonalInfoChange}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={resume.personalInfo.email}
              onChange={handlePersonalInfoChange}
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={resume.personalInfo.phone}
              onChange={handlePersonalInfoChange}
            />
            <Input
              name="location"
              placeholder="Location"
              value={resume.personalInfo.location}
              onChange={handlePersonalInfoChange}
            />
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
          <Textarea
            placeholder="Write a brief summary of your professional experience and goals"
            value={resume.summary}
            onChange={handleSummaryChange}
            rows={4}
          />
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
          {resume.experience.map((exp, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Input
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                className="mb-2"
              />
              <Textarea
                placeholder="Job Description"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                rows={3}
                className="mb-2"
              />
              <Button type="button" variant="destructive" onClick={() => removeExperience(index)}>
                <MinusIcon className="mr-2 h-4 w-4" /> Remove Experience
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addExperience}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Experience
          </Button>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          {resume.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <Input
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                className="mb-2"
              />
              <Button type="button" variant="destructive" onClick={() => removeEducation(index)}>
                <MinusIcon className="mr-2 h-4 w-4" /> Remove Education
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addEducation}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Skills</h3>
          {resume.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-2">
              <Input
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                className="mr-2"
              />
              <Button type="button" variant="destructive" onClick={() => removeSkill(index)}>
                <MinusIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" onClick={addSkill}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Skill
          </Button>
        </section>

        <Button type="submit">Generate Resume</Button>
      </form>
    </motion.div>
  )
}

export default ResumeBuilder