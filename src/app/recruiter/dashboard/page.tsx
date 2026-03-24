import Link from "next/link";
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle,
  Plus,
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

const stats = [
  {
    title: "My Posted Jobs",
    value: "8",
    description: "+1 from last month",
    icon: Briefcase,
  },
  {
    title: "My Candidates",
    value: "64",
    description: "+12 from last week",
    icon: Users,
  },
  {
    title: "Interviews Scheduled",
    value: "9",
    description: "+3 for this week",
    icon: Calendar,
  },
  {
    title: "Hires",
    value: "2",
    description: "In the last 30 days",
    icon: CheckCircle,
  },
];

const recentJobs = [
  {
    id: "JOB-201",
    title: "Senior Backend Engineer",
    department: "Engineering",
    status: "PUBLISHED" as const,
    applicants: 28,
  },
  {
    id: "JOB-202",
    title: "DevOps Engineer",
    department: "Infrastructure",
    status: "PUBLISHED" as const,
    applicants: 15,
  },
  {
    id: "JOB-203",
    title: "QA Automation Lead",
    department: "Quality",
    status: "DRAFT" as const,
    applicants: 0,
  },
  {
    id: "JOB-204",
    title: "Technical Writer",
    department: "Documentation",
    status: "CLOSED" as const,
    applicants: 42,
  },
];

const recentActivity = [
  {
    id: 1,
    candidate: "Priya Sharma",
    action: "applied for",
    job: "Senior Backend Engineer",
    time: "1 hour ago",
    avatar: "PS",
  },
  {
    id: 2,
    candidate: "Rahul Verma",
    action: "was shortlisted for",
    job: "DevOps Engineer",
    time: "3 hours ago",
    avatar: "RV",
  },
  {
    id: 3,
    candidate: "Emily Chen",
    action: "completed interview for",
    job: "Senior Backend Engineer",
    time: "1 day ago",
    avatar: "EC",
  },
  {
    id: 4,
    candidate: "Arjun Patel",
    action: "withdrew application for",
    job: "Technical Writer",
    time: "2 days ago",
    avatar: "AP",
  },
];

function getStatusVariant(status: string) {
  switch (status) {
    case "PUBLISHED":
      return "default";
    case "DRAFT":
      return "secondary";
    default:
      return "outline";
  }
}

export default function RecruiterDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Overview of your hiring activity, posted jobs, and candidate
            pipeline.
          </p>
        </div>
        <Button asChild>
          <Link href="/recruiter/jobs/create">
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Link>
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
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
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
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
            <CardTitle>My Recent Job Postings</CardTitle>
            <CardDescription>
              Jobs you&apos;ve posted and their current status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
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
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell className="hidden text-muted-foreground sm:table-cell">
                        {job.department}
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(job.status)}>
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {job.applicants}
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
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from candidates on your jobs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback>{activity.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.candidate}{" "}
                      <span className="font-normal text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      {activity.job}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
