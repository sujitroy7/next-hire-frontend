import { Badge } from "@/components/ui/badge";
import { fetchApi } from "@/lib/fetch";
import { serverAxios } from "@/lib/server-axios";
import { getOrganizationProfileById } from "@/services/organizationApi";
import { getJobById } from "@/services/publicApi";
import { type Job } from "@/types/job";
import { OrganizationProfile } from "@/types/organization";
import {
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Users,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSalaryDisplay } from "./_utils";
import { Suspense } from "react";
import ApplyButton from "./_components/apply-button";
import ShareButton from "./_components/share-button";
import { Separator } from "@/components/ui/separator";
import ContactInfoSidebar from "@/app/org/profile/[id]/_components/contact-info-sidebar";

export async function generateStaticParams() {
  const response = await fetchApi("/jobs");
  if (response.status !== "success") return [];
  const paths = response.data.data.map((job: Job) => ({
    id: String(job.id),
  }));
  return paths;
}

interface Props {
  params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
  const { id } = await params;

  let job: Job | null = null;
  let orgProfile: OrganizationProfile | null = null;

  try {
    const jobResponse = await getJobById(serverAxios, id);
    if (jobResponse.data.status === "success") {
      job = jobResponse.data.data;
    }

    if (!job) throw new Error("Job not found");

    const orgResponse = await getOrganizationProfileById(
      serverAxios,
      job.organizationId,
    );

    if (orgResponse.data.status === "success") {
      orgProfile = orgResponse.data.data;
    }

    if (!orgProfile) throw new Error("Organization Profile not found");
  } catch {
    notFound();
  }

  const formattedDate = job.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(new Date(job.publishedAt))
    : "Recently";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-muted/30 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-5 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <Badge
                  variant="secondary"
                  className="font-medium text-xs px-2.5 py-0.5 pointer-events-none"
                >
                  {job.employmentType?.replace("_", " ")}
                </Badge>
                {job.workplaceType && (
                  <Badge
                    variant="outline"
                    className="font-medium bg-background text-xs px-2.5 py-0.5 pointer-events-none"
                  >
                    {job.workplaceType?.replace("_", " ")}
                  </Badge>
                )}
                {job.department && (
                  <Badge
                    variant="outline"
                    className="font-medium bg-background text-muted-foreground text-xs px-2.5 py-0.5 pointer-events-none"
                  >
                    {job.department}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl text-foreground">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-muted-foreground text-sm font-medium">
                <Link
                  href={`/org/profile/${job.organizationId}` as any}
                  className="flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>{orgProfile?.name || "NextHire Organization"}</span>
                </Link>
                {job.location && (
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                  <Clock className="w-4 h-4" />
                  <span>Posted {formattedDate}</span>
                </div>
                <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                  <DollarSign className="w-4 h-4" />
                  <span>
                    {getSalaryDisplay(job)}
                    {job.salaryInterval
                      ? ` / ${job?.salaryInterval?.toLowerCase()}`
                      : ""}
                  </span>
                </div>
                {job.experienceLevel && (
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                    <Briefcase className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="capitalize">
                      {job.experienceLevel?.replace("_", " ").toLowerCase()}
                    </span>
                  </div>
                )}
                {job.vacancies !== undefined && job.vacancies !== null && (
                  <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
                    <Users className="w-4 h-4" />
                    <span>
                      {job.vacancies} open position
                      {job.vacancies !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-4 w-full md:w-auto">
              <Suspense fallback={null}>
                <ApplyButton job={job} />
              </Suspense>
              <Suspense fallback={null}>
                <ShareButton job={job} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Content Area (Job Description) */}
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-semibold tracking-tight mb-6">
                About the Role
              </h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/90 leading-7">
                {job.description
                  ?.split("\n")
                  .map((paragraph: string, idx: number) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </section>

            {job.skills && job.skills.length > 0 && (
              <>
                <Separator className="opacity-50" />
                <section>
                  <h3 className="text-xl font-semibold tracking-tight mb-5">
                    Skills & Requirements
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="px-3 py-1.5 text-sm font-medium hover:bg-secondary/80 transition-colors pointer-events-none"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right Sidebar (Metadata) */}
          <div className="space-y-6">
            {orgProfile ? (
              <ContactInfoSidebar
                websiteUrl={orgProfile.websiteUrl}
                linkedinUrl={orgProfile.linkedinUrl}
                publicEmail={orgProfile.publicEmail}
                publicPhone={orgProfile.publicPhone}
                createdAt={orgProfile.createdAt || job.createdAt}
                employeeCount={orgProfile.employeeCount || ""}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
