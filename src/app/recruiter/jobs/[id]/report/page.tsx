import Link from "next/link";
import {
  ArrowLeft,
  Users,
  UserCheck,
  UserX,
  FileText,
  Clock,
  Briefcase,
  ExternalLink,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock Data Types
type JobStatus = "DRAFT" | "PUBLISHED" | "CLOSED" | "ARCHIVED";
type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "HIRED";

// Mock Data
const MOCK_JOB = {
  id: "job-123",
  title: "Senior Frontend Engineer",
  department: "Engineering",
  location: "San Francisco, CA",
  status: "PUBLISHED" as JobStatus,
  publishedAt: new Date("2024-02-15T10:00:00Z"),
  vacancies: 2,
};

const MOCK_STATS = {
  totalApplicants: 145,
  reviewing: 42,
  shortlisted: 12,
  rejected: 89,
  hired: 2,
};

const MOCK_RECENT_APPLICANTS = [
  {
    id: "app-1",
    firstName: "Alice",
    lastName: "Johnson",
    status: "SHORTLISTED" as ApplicationStatus,
    appliedAt: new Date("2024-03-20T14:30:00Z"),
    experienceLevel: "YEARS_5_TO_10",
  },
  {
    id: "app-2",
    firstName: "Michael",
    lastName: "Chen",
    status: "REVIEWING" as ApplicationStatus,
    appliedAt: new Date("2024-03-22T09:15:00Z"),
    experienceLevel: "YEARS_3_TO_5",
  },
  {
    id: "app-3",
    firstName: "Sarah",
    lastName: "Williams",
    status: "APPLIED" as ApplicationStatus,
    appliedAt: new Date("2024-03-24T11:45:00Z"),
    experienceLevel: "YEARS_1_TO_2",
  },
  {
    id: "app-4",
    firstName: "David",
    lastName: "Smith",
    status: "HIRED" as ApplicationStatus,
    appliedAt: new Date("2024-03-10T16:20:00Z"),
    experienceLevel: "YEARS_10_PLUS",
  },
  {
    id: "app-5",
    firstName: "Emily",
    lastName: "Brown",
    status: "REJECTED" as ApplicationStatus,
    appliedAt: new Date("2024-03-15T08:10:00Z"),
    experienceLevel: "UNDER_1_YEAR",
  },
];

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

function formatExperience(exp: string): string {
  const mapping: Record<string, string> = {
    UNDER_1_YEAR: "< 1 Year",
    YEARS_1_TO_2: "1-2 Years",
    YEARS_2_TO_3: "2-3 Years",
    YEARS_3_TO_5: "3-5 Years",
    YEARS_5_TO_10: "5-10 Years",
    YEARS_10_PLUS: "10+ Years",
  };
  return mapping[exp] || exp;
}

export default function JobReportPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch job details and stats based on params.id

  const statCards = [
    {
      title: "Total Applicants",
      value: MOCK_STATS.totalApplicants.toString(),
      icon: Users,
    },
    {
      title: "Currently Reviewing",
      value: MOCK_STATS.reviewing.toString(),
      icon: Clock,
    },
    {
      title: "Shortlisted",
      value: MOCK_STATS.shortlisted.toString(),
      icon: UserCheck,
    },
    {
      title: "Rejected",
      value: MOCK_STATS.rejected.toString(),
      icon: UserX,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-muted-foreground"
              asChild
            >
              <Link href="/recruiter/jobs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {MOCK_JOB.title}
            </h1>
            <Badge
              variant={
                MOCK_JOB.status === "PUBLISHED" ? "default" : "secondary"
              }
            >
              {MOCK_JOB.status}
            </Badge>
          </div>
          <p className="text-muted-foreground flex items-center gap-2 text-sm mt-2">
            <Briefcase className="h-4 w-4" /> {MOCK_JOB.department} &bull;{" "}
            {MOCK_JOB.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/jobs/view/${MOCK_JOB.id}`} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" /> View Public Job
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/recruiter/jobs/${MOCK_JOB.id}/edit`}>Edit Job</Link>
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium tracking-tight">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pipeline Conversion (Mocking a simple progress bar/stats section) */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>Conversion rates for this opening</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Shortlisted Rate
                </span>
                <span className="font-medium">
                  {Math.round(
                    (MOCK_STATS.shortlisted / MOCK_STATS.totalApplicants) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{
                    width: `${(MOCK_STATS.shortlisted / MOCK_STATS.totalApplicants) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-muted-foreground">
                  Hired / Vacancies
                </span>
                <span className="font-medium">
                  {MOCK_STATS.hired} / {MOCK_JOB.vacancies}
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${Math.min((MOCK_STATS.hired / MOCK_JOB.vacancies) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Time to Hire
                </span>
                <span className="text-sm font-bold">~14 Days</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                Estimated avg.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Applicants Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Recent Applicants</CardTitle>
              <CardDescription>
                Latest candidates who applied to this role
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/recruiter/candidates?jobId=${MOCK_JOB.id}`}>
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_RECENT_APPLICANTS.map((applicant) => (
                    <TableRow key={applicant.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {getInitials(
                                applicant.firstName,
                                applicant.lastName,
                              )}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">
                            {applicant.firstName} {applicant.lastName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatExperience(applicant.experienceLevel)}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatTimeAgo(applicant.appliedAt)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            applicant.status === "HIRED"
                              ? "default"
                              : applicant.status === "SHORTLISTED"
                                ? "secondary"
                                : applicant.status === "REJECTED"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {applicant.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
