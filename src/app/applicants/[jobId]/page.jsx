'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import ApplicantsTable from '@/components/Dashboard/ApplicantsTable'


export default function ApplicantsPage({ params }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get('title')

  const redirectToChat = (applicantId) => {
    // Implement chat redirection
    console.log("Redirect to chat with applicant id:", applicantId)
    // You can use Next.js router to redirect to the chat page
    // router.push(`/chat/${applicantId}`)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Applicants for {jobTitle}</h2>
        <Button variant="outline" onClick={() => router.push("/dashboard")}>
          Back to Job Postings
        </Button>
      </div>
      <ApplicantsTable jobId={params.jobId} onChatClick={redirectToChat} />
    </div>
  )
}