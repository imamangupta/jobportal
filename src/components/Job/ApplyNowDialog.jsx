"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toast } from "@radix-ui/react-toast";
import { BaseApiUrl } from "@/utils/constanst";

export default function ApplyNowDialog({ isOpen, onClose, jobTitle, company,job }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 401 Unauthorized), handle it
      localStorage.removeItem('token');
      router.push("/");
    }

    const json = await response.json();
    if (json) {
      console.log(json);
      let newData = {

        userName: json.user.userName,
        userId: json.user.id,
        role: json.user.roleName,
        email: json.user.email

      }
      setData(newData)

      // dispatch(setUser(json.user));
      console.log({ name, email, phone, coverLetter, resume,"crateterid": job.createrid,"userid":json.user.id });
    }





    // setTimeout(() => {
    //   toast.success('Application Submitted Successfully')
    //   onClose();
    // }, 1000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Apply for {jobTitle} at {company}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover-letter">Cover Letter</Label>
              <Textarea
                id="cover-letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Why are you a good fit for this position?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume">CodePathshala Resume Link</Label>
              <Input
                id="resume"
                type="text"
                onChange={(e) => setResume(e.target.value)}
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit">Submit Application</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {showToast && (
        <Toast>
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="font-bold">Application Submitted!</h3>
              <p className="text-sm">
                Your application for {jobTitle} at {company} has been
                successfully submitted.
              </p>
            </div>
          </div>
        </Toast>
      )}
    </>
  );
}
