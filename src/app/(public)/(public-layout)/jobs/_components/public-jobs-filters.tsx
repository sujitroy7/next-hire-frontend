"use client";

import { useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { jobsSearchParams } from "@/lib/searchParams";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const WORKPLACE_TYPES = [
  { label: "Remote", value: "REMOTE" },
  { label: "Hybrid", value: "HYBRID" },
  { label: "On-site", value: "ON_SITE" },
];

const EMPLOYMENT_TYPES = [
  { label: "Full Time", value: "FULL_TIME" },
  { label: "Part Time", value: "PART_TIME" },
  { label: "Contract", value: "CONTRACT" },
  { label: "Freelance", value: "FREELANCE" },
  { label: "Internship", value: "INTERNSHIP" },
];

// Map numerical slider values to types matching ExperienceLevel
const EXPERIENCE_MAPPING = [
  { value: 0, label: "Any", id: null },
  { value: 1, label: "Entry Level", id: "ENTRY_LEVEL" },
  { value: 2, label: "1-3 Years", id: "YEARS_1_TO_3" },
  { value: 3, label: "3-5 Years", id: "YEARS_3_TO_5" },
  { value: 4, label: "5-10 Years", id: "YEARS_5_TO_10" },
  { value: 5, label: "10+ Years", id: "YEARS_10_PLUS" },
];

export function PublicJobsFilters() {
  const [filters, setFilters] = useQueryStates(jobsSearchParams, {
    shallow: false, // ensures server-side data fetching happens
  });

  const clearFilters = () => {
    setFilters({
      search: null,
      workplaceType: null,
      employmentType: null,
      experienceLevel: null,
      page: 1,
    });
  };

  const handleCheckboxToggle = (
    field: "workplaceType" | "employmentType",
    value: string,
  ) => {
    const currentValues = filters[field] || [];
    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    setFilters({
      [field]: newValues.length > 0 ? newValues : null,
      page: 1,
    });
  };

  const hasSelectedFilters =
    (filters.workplaceType && filters.workplaceType.length > 0) ||
    (filters.employmentType && filters.employmentType.length > 0) ||
    filters.experienceLevel ||
    filters.search;

  // Find slider value based on current experienceLevel
  const currentExpIndex = filters.experienceLevel
    ? EXPERIENCE_MAPPING.findIndex((e) => e.id === filters.experienceLevel)
    : 0;

  const currentExpObj = EXPERIENCE_MAPPING[currentExpIndex];

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-9 h-10 w-full bg-white shadow-sm"
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({ search: e.target.value || null, page: 1 })
            }
          />
        </div>
      </div>

      {/* Workplace Type */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-tight">Workplace Type</h3>
        <div className="flex flex-col gap-3">
          {WORKPLACE_TYPES.map((type) => {
            const isChecked =
              filters.workplaceType?.includes(type.value) || false;
            return (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`workplace-${type.value}`}
                  checked={isChecked}
                  onCheckedChange={() =>
                    handleCheckboxToggle("workplaceType", type.value)
                  }
                />
                <label
                  htmlFor={`workplace-${type.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Employment Type */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-tight">
          Employment Type
        </h3>
        <div className="flex flex-col gap-3">
          {EMPLOYMENT_TYPES.map((type) => {
            const isChecked =
              filters.employmentType?.includes(type.value) || false;
            return (
              <div key={type.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`employment-${type.value}`}
                  checked={isChecked}
                  onCheckedChange={() =>
                    handleCheckboxToggle("employmentType", type.value)
                  }
                />
                <label
                  htmlFor={`employment-${type.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {type.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Experience Level Slider */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold tracking-tight">
          Experience Level
        </h3>
        <div className="pt-2 pb-6 px-1">
          <Slider
            defaultValue={[0]}
            max={5}
            step={1}
            value={[currentExpIndex]}
            onValueChange={(vals) => {
              const mapping = EXPERIENCE_MAPPING[vals[0]];
              setFilters({
                experienceLevel: mapping.id,
                page: 1,
              });
            }}
          />
          <div className="mt-4 text-sm font-medium text-center text-primary">
            {currentExpObj?.label}
          </div>
        </div>
      </div>

      {hasSelectedFilters && (
        <Button
          variant="ghost"
          onClick={clearFilters}
          className="w-full text-muted-foreground"
        >
          Clear all filters
        </Button>
      )}
    </div>
  );
}
