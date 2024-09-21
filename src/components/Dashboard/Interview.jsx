"use client"; // This is required for Next.js client-side rendering
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusIcon, MinusIcon } from "lucide-react";
import { useRouter } from "next/navigation"; // For handling routing

const Interview = () => {
  const router = useRouter();
  const [interviews, setInterviews] = useState([
    {
      id: 1,
      company: "Code Pathshala",
      position: "Senior Developer",
      date: "2024-09-21",
      notes: "Start Interview ask According Your Questions",
    },
  ]);

  const [newInterview, setNewInterview] = useState({
    company: "",
    position: "",
    date: "",
    notes: "",
  });

  // Handle input changes for adding new interviews
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInterview((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new interview to the list
  const addInterview = () => {
    if (newInterview.company && newInterview.position && newInterview.date) {
      setInterviews((prev) => [
        ...prev,
        { id: prev.length + 1, ...newInterview },
      ]);
      setNewInterview({ company: "", position: "", date: "", notes: "" });
    }
  };

  // Remove an interview from the list
  const removeInterview = (id) => {
    setInterviews((prev) => prev.filter((interview) => interview.id !== id));
  };

  // Redirect to the InterviewRoom page with a unique roomID
  const startInterview = (roomID) => {
    // router.push(`/interview/${roomID}`); // Route correctly to the new structure
    const url = `/interview/${roomID}`;
  window.open(url, '_blank');
  };

  const [commonQuestions] = useState([
    "Tell me about yourself.",
    "Why do you want to work for our company?",
    "What are your strengths and weaknesses?",
    "Describe a challenging project you've worked on.",
    "How do you handle tight deadlines?",
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Interview Preparation</h2>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="company"
          placeholder="Company"
          value={newInterview.company}
          onChange={handleInputChange}
        />
        <Input
          name="position"
          placeholder="Position"
          value={newInterview.position}
          onChange={handleInputChange}
        />
        <Input
          name="date"
          type="date"
          value={newInterview.date}
          onChange={handleInputChange}
        />
        <Textarea
          name="notes"
          placeholder="Interview Notes"
          value={newInterview.notes}
          onChange={handleInputChange}
        />
      </div>

      <Button onClick={addInterview} className="mb-6">
        <PlusIcon className="mr-2 h-4 w-4" /> Add Interview
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {interviews.map((interview) => (
          <Card key={interview.id}>
            <CardHeader>
              <CardTitle>{interview.company}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {/* <strong>Position:</strong> {interview.position} */}
              </p>
              <p>
                <strong>Date:</strong> {interview.date}
              </p>
              <p>
                <strong>Notes:</strong> {interview.notes}
              </p>
              <div>
{/* 
              <Button  variant="destructive"   onClick={() => removeInterview(interview.id)} className="mt-4"   >
                <MinusIcon className="mr-2 h-4 w-4" /> Remove
              </Button> */}
              <Button  onClick={() => startInterview(interview.id)}    className="mt-3 ml-4"          >
                Start Interview
              </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-4">
        Common Interview Questions
      </h3>
      <ul className="list-disc pl-6">
        {commonQuestions.map((question, index) => (
          <li key={index} className="mb-2">
            {question}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Interview;
