import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobProfileCard from "./JobProfileCard";

export default function SimilarJobs({ jobs, onJobSelect }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Similar Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        {jobs.map((job) => (
          <JobProfileCard
            key={job.id}
            job={job}
            onSelect={() => onJobSelect(job.id)}
          />
        ))}
      </CardContent>
    </Card>
  );
}
