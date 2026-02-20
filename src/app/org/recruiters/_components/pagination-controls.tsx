import { Button } from "@/components/ui/button";
import { Pagination } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationControlsProps {
  pagination: Pagination;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function PaginationControls({
  pagination,
  searchParams,
}: PaginationControlsProps) {
  const pages = Array.from(
    { length: Math.ceil(pagination.total / pagination.limit) || 1 },
    (_, i) => i + 1,
  );

  const createPageURL = (pageNumber: number | string) => {
    // stringify the primitives, skipping array objects or undefined correctly,
    // though Next.js searchParams can be string or string[]
    const params = new URLSearchParams();
    if (searchParams) {
      Object.entries(searchParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else if (value !== undefined) {
          params.append(key, value);
        }
      });
    }
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const isFirstPage = pagination.page <= 1;
  const isLastPage =
    pagination.page >= (Math.ceil(pagination.total / pagination.limit) || 1);

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-muted-foreground">
        Page {pagination.page} of{" "}
        {Math.ceil(pagination.total / pagination.limit) || 1} &middot;{" "}
        {pagination.total} recruiters
      </p>
      <div className="flex items-center gap-1">
        {isFirstPage ? (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Prev
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href={createPageURL(pagination.page - 1) as any}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Prev
            </Link>
          </Button>
        )}

        {pages.map((page) =>
          page === pagination.page ? (
            <Button key={page} variant="default" size="icon-sm">
              {page}
            </Button>
          ) : (
            <Button key={page} variant="outline" size="icon-sm" asChild>
              <Link href={createPageURL(page) as any}>{page}</Link>
            </Button>
          ),
        )}

        {isLastPage ? (
          <Button variant="outline" size="sm" disabled>
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href={createPageURL(pagination.page + 1) as any}>
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
