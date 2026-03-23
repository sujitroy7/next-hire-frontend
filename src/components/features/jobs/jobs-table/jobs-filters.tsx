"use client";

import { useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { jobsSearchParams } from "@/lib/searchParams";

export function JobsFilters() {
  const [filters, setFilters] = useQueryStates(jobsSearchParams, {
    shallow: false,
  });

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search jobs by title"
          className="pl-9 h-10 w-full md:max-w-md bg-white shadow-sm"
          value={filters.search || ""}
          onChange={(e) => setFilters({ search: e.target.value || null })}
        />
      </div>
      <div className="min-w-full sm:min-w-[140px]">
        <Select
          value={filters.status ?? "ALL"}
          onValueChange={(value) =>
            setFilters({ status: value === "ALL" ? null : value })
          }
        >
          <SelectTrigger className="h-10 bg-white shadow-sm w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
