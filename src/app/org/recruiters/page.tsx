"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Recruiter, RecruiterPagination } from "@/types/recruiter";

// ── Toggle to preview the empty state ──────────────────────────────
const SHOW_EMPTY_STATE = false;

// ── Mock Data ──────────────────────────────────────────────────────
const MOCK_RECRUITERS: Recruiter[] = [
  {
    id: "a1b2c3d4-5678-90ab-cdef-111111111111",
    userId: "f9e8d7c6-5432-10ab-cdef-222222222222",
    firstName: "Rahul",
    lastName: "Sharma",
    publicEmail: "rahul.sharma@acmecorp.com",
    publicPhone: "+91 98765 43210",
    linkedinUrl: "https://linkedin.com/in/rahulsharma",
    about:
      "Senior Technical Recruiter with 5+ years of experience in hiring for engineering roles.",
    isActive: true,
    user: {
      email: "rahul@acmecorp.com",
      createdAt: "2026-01-15T10:30:00.000Z",
    },
  },
  {
    id: "b2c3d4e5-6789-01bc-def0-333333333333",
    userId: "e8d7c6b5-4321-09ab-cdef-444444444444",
    firstName: "Priya",
    lastName: "Patel",
    publicEmail: null,
    publicPhone: null,
    linkedinUrl: "https://linkedin.com/in/priyapatel",
    about: null,
    isActive: true,
    user: {
      email: "priya@acmecorp.com",
      createdAt: "2026-02-01T14:20:00.000Z",
    },
  },
  {
    id: "c3d4e5f6-7890-12cd-ef01-555555555555",
    userId: "d7c6b5a4-3210-98ab-cdef-666666666666",
    firstName: "Amit",
    lastName: "Kumar",
    publicEmail: "amit.kumar@acmecorp.com",
    publicPhone: "+91 91234 56789",
    linkedinUrl: null,
    about:
      "HR Specialist focused on campus recruitment and internship programs.",
    isActive: false,
    user: {
      email: "amit@acmecorp.com",
      createdAt: "2026-02-10T09:00:00.000Z",
    },
  },
];

const MOCK_PAGINATION: RecruiterPagination = {
  total: 23,
  page: 2,
  limit: 5,
  totalPages: 5,
};

// ── Helpers ────────────────────────────────────────────────────────
function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Empty State ────────────────────────────────────────────────────
function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted mb-4">
          <Users className="size-6 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold tracking-tight mb-1">
          No recruiters yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          Recruiters help you find the best talent. Add your first recruiter to
          get started.
        </p>
        <Button>
          <Plus />
          Add Your First Recruiter
        </Button>
      </CardContent>
    </Card>
  );
}

// ── Recruiter Row ──────────────────────────────────────────────────
function RecruiterRow({ recruiter }: { recruiter: Recruiter }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4 min-w-0">
        <Avatar size="lg">
          <AvatarFallback>
            {getInitials(recruiter.firstName, recruiter.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none truncate">
            {recruiter.firstName} {recruiter.lastName}
          </p>
          <p className="text-sm text-muted-foreground truncate mt-1">
            {recruiter.user.email}
          </p>
        </div>
      </div>

      {/* Center: Status + Joined */}
      <div className="hidden md:flex items-center gap-6">
        <Badge variant={recruiter.isActive ? "secondary" : "outline"}>
          {recruiter.isActive ? "Active" : "Inactive"}
        </Badge>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Joined {formatDate(recruiter.user.createdAt)}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" aria-label="Edit recruiter">
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
          aria-label="Delete recruiter"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Pagination ─────────────────────────────────────────────────────
function Pagination({ pagination }: { pagination: RecruiterPagination }) {
  const pages = Array.from({ length: pagination.totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-muted-foreground">
        Page {pagination.page} of {pagination.totalPages} &middot;{" "}
        {pagination.total} recruiters
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={pagination.page === 1}>
          <ChevronLeft />
          Prev
        </Button>

        {pages.map((page) => (
          <Button
            key={page}
            variant={page === pagination.page ? "default" : "outline"}
            size="icon-sm"
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={pagination.page === pagination.totalPages}
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default function RecruitersPage() {
  const recruiters = SHOW_EMPTY_STATE ? [] : MOCK_RECRUITERS;
  const pagination = MOCK_PAGINATION;
  const isEmpty = recruiters.length === 0;

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Recruiters</h1>
            <p className="text-muted-foreground mt-1">
              Manage recruiters for your organization
            </p>
          </div>
          {!isEmpty && (
            <Button>
              <Plus />
              Add Recruiter
            </Button>
          )}
        </div>

        {/* Content */}
        {isEmpty ? (
          <EmptyState />
        ) : (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-base">All Recruiters</CardTitle>
              <CardDescription>
                {pagination.total} recruiter{pagination.total !== 1 && "s"}{" "}
                total
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {recruiters.map((recruiter) => (
                  <div key={recruiter.id} className="px-4">
                    <RecruiterRow recruiter={recruiter} />
                  </div>
                ))}
              </div>
            </CardContent>
            {/* Pagination */}
            <div className="px-6 pb-2">
              <Separator />
              <Pagination pagination={pagination} />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
