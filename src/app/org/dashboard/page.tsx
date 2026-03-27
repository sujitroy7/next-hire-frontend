import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  MoreHorizontal,
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
import { serverAxios } from "@/lib/server-axios";
import {
  getOrganizationDashboardStats,
  getOrganizationRecentActivity,
} from "@/services/organizationApi";
import {
  OrgDashboardStats,
  DashboardRecentJob,
  RecentActivityItem,
} from "@/types/dashboard";
import { Job } from "@/types/job";

const STATUS_ACTION_MAP: Record<string, string> = {
  APPLIED: "applied for",
  REVIEWING: "is being reviewed for",
  SHORTLISTED: "was shortlisted for",
  REJECTED: "was rejected for",
  HIRED: "was hired for",
};

function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default async function OrganizationDashboardPage() {
  let stats: OrgDashboardStats = {
    totalJobs: 0,
    activeApplications: 0,
    interviewsScheduled: 0,
    hires: 0,
  };
  let recentJobs: Job[] = [];
  let recentActivity: RecentActivityItem[] = [];

  try {
    const [dashboardRes, activityRes] = await Promise.all([
      getOrganizationDashboardStats(serverAxios),
      getOrganizationRecentActivity(serverAxios),
    ]);

    if (dashboardRes.data.status === "success") {
      stats = dashboardRes.data.data.stats;
      recentJobs = dashboardRes.data.data.recentJobs;
    }

    if (activityRes.data.status === "success") {
      recentActivity = activityRes.data.data;
    }
  } catch (error) {
    // Fallback to zero/empty states on error
  }

  const statCards = [
    {
      title: "Total Jobs",
      value: stats.totalJobs.toString(),
      icon: Briefcase,
    },
    {
      title: "Active Applications",
      value: stats.activeApplications.toString(),
      icon: Users,
    },
    {
      title: "Interviews Scheduled",
      value: stats.interviewsScheduled.toString(),
      icon: Calendar,
    },
    {
      title: "Hires",
      value: stats.hires.toString(),
      icon: CheckCircle,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Overview of your organization&apos;s hiring metrics and recent
            activity.
          </p>
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

      {/* Main Content Area */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Jobs Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>
              Manage your active jobs and review applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {recentJobs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Department
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Applicants</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentJobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">
                          {job.title}
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          {job.department || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              job.status === "PUBLISHED"
                                ? "default"
                                : job.status === "DRAFT"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {job?._count?.jobApplications}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  No job postings yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from candidates.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-6">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>
                        {getInitials(
                          activity.candidate.firstName,
                          activity.candidate.lastName,
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.candidate.firstName}{" "}
                        {activity.candidate.lastName}{" "}
                        <span className="font-normal text-muted-foreground">
                          {STATUS_ACTION_MAP[activity.status] || "applied for"}
                        </span>{" "}
                        {activity.job.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatTimeAgo(activity.appliedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                No recent activity.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
