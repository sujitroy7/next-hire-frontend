import { serverAxios } from "@/lib/server-axios";
import { getJobById } from "@/services/publicApi";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  ExternalLink,
  Share2,
  Clock,
} from "lucide-react";
import { getOrganizationProfileById } from "@/services/organizationApi";
import ContactInfoSidebar from "@/app/org/profile/[id]/_components/contact-info-sidebar";
import { Job } from "@/types/job";

const formatCurrency = (amount: number, currency: string = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getSalaryDisplay = (job: Job) => {
  if (!job.salaryMin && !job.salaryMax) return "Salary not specified";
  if (job.salaryMin && !job.salaryMax)
    return `${formatCurrency(job.salaryMin, job.currency)}+`;
  if (!job.salaryMin && job.salaryMax)
    return `Up to ${formatCurrency(job.salaryMax, job.currency)}`;
  return `${formatCurrency(job.salaryMin, job.currency)} - ${formatCurrency(job.salaryMax, job.currency)}`;
};

export default async function JobViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let job;
  let org;

  try {
    const response = await getJobById(serverAxios, id);
    if (response.data.status === "success") {
      job = response.data.data;
      const orgResponse = await getOrganizationProfileById(
        serverAxios,
        job.organizationId,
      );
      if (orgResponse.data.status === "success") {
        org = orgResponse.data.data;
      }
    }
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404)
      notFound();
    throw error;
  }

  if (!job) return notFound();

  const isExternalApply = !!job.externalApplyUrl;

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
                  <span>{org?.name || "NextHire Organization"}</span>
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
                      ? ` / ${job.salaryInterval.toLowerCase()}`
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
              {isExternalApply ? (
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
              )}
              <Button size="lg" variant="outline" className="px-4" asChild>
                <button aria-label="Share Job">
                  <Share2 className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
              </Button>
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
            {org ? (
              <ContactInfoSidebar
                websiteUrl={org.websiteUrl}
                linkedinUrl={org.linkedinUrl}
                publicEmail={org.publicEmail}
                publicPhone={org.publicPhone}
                createdAt={org.createdAt || job.createdAt}
                employeeCount={org.employeeCount || ""}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
