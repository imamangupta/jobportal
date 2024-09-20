
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, Eye, MessageSquare } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BaseApiUrl } from "@/utils/constanst"

export default function EditJob({ job}) {

    const router = useRouter()

    const [newJobPost, setNewJobPost] = useState({
        title: job.title,
        company: job.company,
        logoColor: job.logoColor,
        location: job.location,
        jobType: job.jobType,
        workType: job.workType,
        experience: job.experience,
        salary: job.salary,
        description: job.description,
        qualifications: job.qualifications,
        responsibilities: job.responsibilities,
        tags: job.tags,
        jobFunction: job.jobFunction,
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewJobPost((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name, value) => {
        setNewJobPost((prev) => ({ ...prev, [name]: value }))
    }

    const addOrUpdateJobPost = async () => {
        console.log(newJobPost);
        const response = await fetch(`${BaseApiUrl}/job/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id":job._id,
                "createdby": job.createdby,
                "title": newJobPost.title,
                "company": newJobPost.company,
                "logoColor": newJobPost.logoColor,
                "location": newJobPost.location,
                "jobType": newJobPost.jobType,
                "workType": newJobPost.workType,
                "experience": newJobPost.experience,
                "salary": newJobPost.salary,
                "postedTime": 'today',
                "tags": newJobPost.tags,
                "jobFunction": newJobPost.jobFunction,
                "type": newJobPost.jobType,
                "description": newJobPost.description,
                "qualifications": newJobPost.qualifications,
                "responsibilities": newJobPost.responsibilities
            })
        });
        const json = await response.json();

        if (json) {
            console.log(json);

            router.push("/job")
        }

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit Job Post </DialogTitle>
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
                            <Label htmlFor="location">Locations</Label>
                            <Input id="location" name="location" value={newJobPost.location} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="jobType">Job Type</Label>
                            <Select value={newJobPost.jobType} onValueChange={(value) => handleSelectChange('jobType', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Job Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Internship">Intership</SelectItem>
                                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="workType">Work Type</Label>
                            <Select value={newJobPost.workType} onValueChange={(value) => handleSelectChange('workType', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Work Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="On-Site">On-Site</SelectItem>
                                        <SelectItem value="Remote">Remote</SelectItem>
                                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="experience">Experience</Label>
                            <Select value={newJobPost.experience} onValueChange={(value) => handleSelectChange('experience', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Experience" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="Entry Level">Entry Level</SelectItem>
                                        <SelectItem value="Mid Level">Mid Level</SelectItem>
                                        <SelectItem value="Senior Level">Senior Level</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
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
                        <Label htmlFor="qualifications">Qualifications</Label>
                        <Textarea id="qualifications" name="qualifications" value={newJobPost.qualifications} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="responsibilities">Responsibilities</Label>
                        <Textarea id="responsibilities" name="responsibilities" value={newJobPost.responsibilities} onChange={handleInputChange} />
                    </div>
                    <div>
                        <Label htmlFor="tags">Skills</Label>
                        <Input id="tags" name="tags" value={newJobPost.tags} onChange={handleInputChange} />
                    </div>
                </div>
                <Button onClick={addOrUpdateJobPost} >
                    Update Job Post
                </Button>
            </DialogContent>
        </Dialog>
    )
}
