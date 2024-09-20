"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2 } from "lucide-react";
import ApplyNowDialog from "./ApplyNowDialog";
import { checkToken } from "@/utils/checkToken";

export default function JobDescription({ job }) {
  console.log(job);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically update this state in your backend or local storage
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job: ${job.title} at ${job.company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      alert("Share feature not supported on this browser");
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const tokenValid = await checkToken()
      setIsAuthenticated(tokenValid)
    }
    verifyToken()
  }, [])

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-md flex items-center justify-center text-white text-2xl font-bold">
            {job.company?job.company[0]:''}
          </div>
          <div>
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {job.company} • {job.location}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          {
            isAuthenticated ? <>

              <Button onClick={() => setIsApplyDialogOpen(true)}>Apply Now</Button>
              <Button variant="outline" size="icon" onClick={handleBookmark}>
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
            </> : ''
          }

          <Button variant="outline" size="icon" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          {/* {job.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))} */}
             <Badge  variant="secondary">
              {job.experience}
            </Badge>
             <Badge  variant="secondary">
              {job.jobType}
            </Badge>
             <Badge  variant="secondary">
              {job.salary}
            </Badge>
             <Badge  variant="secondary">
              {job.workType}
            </Badge>
             <Badge  variant="secondary">
              {job.experience}
            </Badge>
        </div>
        <h3 className="font-semibold mb-2">Skills</h3>
        <p className="text-sm text-muted-foreground mb-4">{job.tags}</p>
        <h3 className="font-semibold mb-2">About this role</h3>
        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
        <h3 className="font-semibold mb-2">Qualification</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
          {job.qualifications}
        </ul>
        <h3 className="font-semibold mb-2">Responsibility</h3>
        <ul className="list-disc list-inside text-sm text-muted-foreground mb-4">
          {job.responsibilities}
        </ul>
        {/* <h3 className="font-semibold mb-2">Attachment</h3> */}
        {/* <div className="grid grid-cols-2 gap-4">
          {job.attachments.map((attachment, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={attachment.image}
                alt={attachment.title}
                className="w-full h-32 object-cover"
              />
              <CardContent className="p-2">
                <p className="text-sm font-medium text-center">
                  {attachment.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div> */}
      </CardContent>
      <ApplyNowDialog
        isOpen={isApplyDialogOpen}
        onClose={() => setIsApplyDialogOpen(false)}
        jobTitle={job.title}
        company={job.company}
        job={job}
      />
    </Card>
  );
}
