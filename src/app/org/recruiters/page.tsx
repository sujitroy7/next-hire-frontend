import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import type { Recruiter } from "@/types/recruiter";
import { serverAxios } from "@/lib/server-axios";
import { PaginationControls } from "./_components/pagination-controls";
import { AxiosError } from "axios";
import { getOrgRecruiters } from "@/services/organizationApi";
import EmptyState from "./_components/empty-state";
import { RecruitersTable } from "./_components/recruiters-table";
import AddRecruiterButtonWrapper from "./_components/add-recruiter-dialog-wrapper";

interface Props {
  searchParams?: Promise<{ page: string; limit: string; action?: string }>;
}

export default async function RecruitersPage(props: Props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 10;

  let recruiters: Recruiter[] = [];
  let pagination = { total: 0, page: 1, limit: 10, totalPages: 0 };
  let errorMsg = null;

  try {
    const { data } = await getOrgRecruiters(serverAxios, { page, limit });

    if (data.status === "success") {
      recruiters = data.data.data;
      pagination = data.data.pagination;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      errorMsg = error.response?.data?.message || "Failed to fetch recruiters";
    } else {
      errorMsg = "An unexpected error occurred";
    }
  }

  const isEmpty = recruiters.length === 0;

  return (
    <div className="flex-1 space-y-8 max-w-7xl mx-auto w-full py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Recruiters
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage recruiters for your organization
          </p>
        </div>
        {!isEmpty && (
          <AddRecruiterButtonWrapper>
            <Button size="lg" className="shadow-sm cursor-pointer">
              <Plus className="mr-2 h-5 w-5" />
              Add Recruiter
            </Button>
          </AddRecruiterButtonWrapper>
        )}
      </div>

      {/* Content */}
      {errorMsg ? (
        <div className="text-center text-destructive py-8">{errorMsg}</div>
      ) : isEmpty ? (
        <EmptyState />
      ) : (
        <Card className="border-border/50 shadow-sm bg-background/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              View and manage your recruiting team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecruitersTable data={recruiters} />
          </CardContent>
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="px-6 pb-2">
              <Separator />
              <PaginationControls
                pagination={pagination}
                searchParams={searchParams}
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
