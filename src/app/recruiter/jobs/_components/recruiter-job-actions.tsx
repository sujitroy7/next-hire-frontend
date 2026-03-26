"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, FileText, Send } from "lucide-react";
import { Job } from "@/types/job";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";

const PublishJobDialog = dynamic(
  () => import("./publish-job-dialog").then((mod) => mod.PublishJobDialog),
  { ssr: false },
);

export function RecruiterJobActions({ job }: { job: Job }) {
  const router = useRouter();
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {job.status === "DRAFT" && (
            <DropdownMenuItem onClick={() => setIsPublishDialogOpen(true)}>
              <Send className="mr-2 h-4 w-4" />
              Publish
            </DropdownMenuItem>
          )}
          {job.status === "PUBLISHED" && (
            <DropdownMenuItem
              onClick={() => router.push(`/jobs/view/${job.id}` as any)}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => router.push(`/recruiter/jobs/${job.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/recruiter/jobs/${job.id}/report`)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Job Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isPublishDialogOpen && (
        <PublishJobDialog
          jobId={job.id}
          open={isPublishDialogOpen}
          onOpenChange={setIsPublishDialogOpen}
        />
      )}
    </>
  );
}
