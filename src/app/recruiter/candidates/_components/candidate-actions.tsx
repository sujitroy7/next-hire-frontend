"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, FileText, Eye } from "lucide-react";
import { OrganizationCandidate } from "@/types/candidate";

export function CandidateActions({
  candidate,
}: {
  candidate: OrganizationCandidate;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {candidate.resumeUrl && (
          <DropdownMenuItem asChild>
            <a
              href={candidate.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileText className="mr-2 h-4 w-4" />
              View Resume
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <a
            href={`/recruiter/jobs/${candidate.job.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Job
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
