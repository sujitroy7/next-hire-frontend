import { CreateJobForm } from "@/components/features/jobs/create-job-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CreateJobPage() {
  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4 -ml-4">
          <Link href="/recruiter/jobs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Create Job Posting
        </h2>
        <p className="text-muted-foreground mt-1">
          Fill out the details below to publish a new open position.
        </p>
      </div>

      <CreateJobForm />
    </div>
  );
}
