"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

export default function JobProfileCard({ job, onSelect }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // Here you would typically update this state in your backend or local storage
  };

  return (
    <Card className="mb-4 cursor-pointer" onClick={onSelect}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {job.company[0]}
            </div>
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-xs text-muted-foreground">
                {job.company} • {job.location}
              </p>
            </div>
          </div>
          <Bookmark
            className={`h-5 w-5 cursor-pointer ${
              isBookmarked ? "fill-current text-primary" : ""
            }`}
            onClick={handleBookmark}
          />
        </div>
        <div className="flex space-x-2 mb-2">
          <Badge variant="outline">{job.type}</Badge>
          <Badge variant="outline">{job.location}</Badge>
          <Badge variant="outline">{job.experience}</Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          {job.postedTime} • {job.applicants}
        </p>
      </CardContent>
    </Card>
  );
}
