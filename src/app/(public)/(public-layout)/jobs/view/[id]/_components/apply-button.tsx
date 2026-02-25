import { Button } from "@/components/ui/button";
import { Job } from "@/types/job";
import { ExternalLink } from "lucide-react";

export default function ApplyButton({ job }: { job: Job }) {
  const isExternalApply = !!job.externalApplyUrl;

  return isExternalApply ? (
    <Button
      size="lg"
      className="w-full md:w-auto font-semibold px-8 hover:scale-[1.02] transition-transform"
      asChild
    >
      <a
        href={job.externalApplyUrl ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Now
        <ExternalLink className="w-4 h-4 ml-2" />
      </a>
    </Button>
  ) : (
    <Button
      size="lg"
      className="w-full md:w-auto font-semibold px-8 hover:scale-[1.02] transition-transform"
      asChild
    >
      <a href="#apply">Apply Now</a>
    </Button>
  );
}
