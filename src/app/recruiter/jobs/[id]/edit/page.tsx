import { EditJobForm } from "@/app/recruiter/jobs/[id]/edit/edit-job-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getRecruiterJobById } from "@/services/organizationApi";
import { serverAxios } from "@/lib/server-axios";
import { notFound } from "next/navigation";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage(props: EditJobPageProps) {
  const { id } = await props.params;

  try {
    const response = await getRecruiterJobById(serverAxios, id);
    if (response.data.status !== "success" || !response.data.data) {
      notFound();
    }

    const job = response.data.data;

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
            Edit Job Posting
          </h2>
          <p className="text-muted-foreground mt-1">
            Update the details for this position.
          </p>
        </div>

        <EditJobForm job={job} />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
