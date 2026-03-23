"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit } from "lucide-react";
import { Job } from "@/types/job";
import { useRouter } from "next/navigation";

export function RecruiterJobActions({
  job,
  isOwner,
}: {
  job: Job;
  isOwner: boolean;
}) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/jobs/view/${job.id}` as any)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        {isOwner && (
          <DropdownMenuItem
            onClick={() => router.push(`/recruiter/jobs/${job.id}/edit`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Details
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
