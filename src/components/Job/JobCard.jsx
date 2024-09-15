"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  IndianRupeeIcon,
} from "lucide-react";
import { motion } from "framer-motion";

const JobCard = ({ job, view }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className={`mb-4 overflow-hidden rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 ${
          view === "grid" ? "h-full" : ""
        }`}
      >
        <CardContent className="p-6">
          <div
            className={`flex ${view === "grid" ? "flex-col" : "items-start"}`}
          >
            <div
              className={`w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xl font-bold ${
                view === "grid" ? "mb-4 mx-auto" : "mr-4"
              }`}
              style={{ backgroundColor: job.logoColor, color: "#ffffff" }}
            >
              {job.company[0]}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary" className="text-xs">
                  <MapPinIcon className="w-3 h-3 mr-1" />
                  {job.location}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <BriefcaseIcon className="w-3 h-3 mr-1" />
                  {job.jobType}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  <IndianRupeeIcon className="w-3 h-3 mr-1" />
                  {job.salary}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span className="text-xs">{job.postedTime}</span>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JobCard;
