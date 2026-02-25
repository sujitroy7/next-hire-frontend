import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Job } from "@/types/job";
import { Check, Copy, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ShareDialog({
  job,
  open,
  setOpen,
}: {
  job: Job;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const [copied, setCopied] = useState(false);
  const jobUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jobUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
  };

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-blue-500 hover:bg-blue-600 text-white",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(jobUrl)}&text=${encodeURIComponent(`Check out this job at ${job.organization?.organizationProfile?.name || "NextHire"}: ${job.title}`)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      color: "bg-blue-700 hover:bg-blue-800 text-white",
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(jobUrl)}&title=${encodeURIComponent(job.title)}&summary=${encodeURIComponent(`Check out this job at ${job.organization?.organizationProfile?.name || "NextHire"}`)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(jobUrl)}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share job</DialogTitle>
          <DialogDescription>
            Share this job with your network or copy the link directly.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-4 py-4">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.name}`}
              className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform hover:scale-105 shadow-sm ${link.color}`}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              value={jobUrl}
              readOnly
              className="w-full text-muted-foreground"
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
