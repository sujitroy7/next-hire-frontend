import { Briefcase, Sparkles } from "lucide-react";
import { EarlyAccessForm } from "@/components/early-access-form";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center pt-40 space-y-8 bg-background px-4 text-center overflow-hidden py-12">
      {/* Brand Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/20">
        <Briefcase className="h-10 w-10 text-primary" />
      </div>

      {/* Brand Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 shadow-sm">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold tracking-wide text-primary uppercase">
          NextHire
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
        Coming Soon
      </h1>

      {/* Subtitle */}
      <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl md:leading-relaxed">
        We are crafting a revolutionary platform to connect top talent with
        extraordinary opportunities. The future of hiring is almost here.
      </p>

      {/* Early Access Form */}
      <div className="w-full max-w-md mx-auto mt-4">
        <EarlyAccessForm />
      </div>
    </div>
  );
}
