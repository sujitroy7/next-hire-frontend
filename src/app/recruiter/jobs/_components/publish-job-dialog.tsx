"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { updateRecruiterJobStatus } from "@/services/organizationApi";
import { clientAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface PublishJobDialogProps {
  jobId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PublishJobDialog({
  jobId,
  open,
  onOpenChange,
}: PublishJobDialogProps) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const res = await updateRecruiterJobStatus(
        clientAxios,
        jobId,
        "PUBLISHED",
      );
      if (res.data.status === "success") {
        toast.success("Job published successfully!");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error((res.data as any).message || "Failed to publish job");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Job</DialogTitle>
          <DialogDescription>
            Are you sure you want to publish this job? Once published, it will
            be visible to candidates.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPublishing}
          >
            Cancel
          </Button>
          <Button onClick={handlePublish} disabled={isPublishing}>
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
