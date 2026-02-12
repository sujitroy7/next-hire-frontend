import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function CandidateProfileNotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[12rem] font-bold text-primary">404</span>
        </div>
        <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full bg-muted/50 backdrop-blur-sm">
          <FileQuestion className="h-16 w-16 text-primary" />
        </div>
      </div>

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Profile Not Found
      </h1>

      <p className="mb-8 max-w-[600px] text-lg text-muted-foreground">
        We couldn't find the candidate profile you're looking for.
      </p>

      <Button asChild size="lg" className="font-semibold">
        <Link href="/">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Return to Home
        </Link>
      </Button>
    </div>
  );
}
