"use client";

import { Job } from "@/types/job";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useQueryState } from "nuqs";
import dynamic from "next/dynamic";

const ShareDialog = dynamic(() => import("./share-dialog"), {
  loading: () => null,
});

export default function ShareButton({ job }: { job: Job }) {
  const [share, setShare] = useQueryState("share", { defaultValue: "" });

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        className="px-4 group"
        aria-label="Share Job"
        onClick={() => setShare("true")}
      >
        <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </Button>
      {share === "true" && (
        <ShareDialog
          job={job}
          open={share === "true"}
          setOpen={(value) => setShare(value ? "true" : "")}
        />
      )}
    </>
  );
}
