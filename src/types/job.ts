export type JobStatus = "PUBLISHED" | "DRAFT" | "CLOSED";
export type WorkplaceType = "REMOTE" | "HYBRID" | "ON_SITE";
export type EmploymentType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "CONTRACTUAL"
  | "FREELANCE"
  | "INTERNSHIP";
export type ExperienceLevel =
  | "ENTRY_LEVEL"
  | "YEARS_1_TO_3"
  | "YEARS_3_TO_5"
  | "YEARS_5_TO_10"
  | "YEARS_10_PLUS";

export interface JobOrganization {
  id: string;
  email: string;
  organizationProfile: {
    name: string;
    logoUrl?: string;
    websiteUrl?: string;
  };
}

export interface JobRecruiter {
  id: string;
  email: string;
  recruiterProfile: {
    firstName: string;
    lastName: string;
    linkedinUrl?: string;
  };
}

export interface Job {
  id: string;
  organizationId: string;
  recruiterId: string;
  title: string;
  description: string;
  department: string;
  location: string;
  workplaceType: WorkplaceType;
  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;

  currency: string;
  salaryMin: number;
  salaryMax: number;
  salaryInterval: string;

  skills: string[];
  vacancies: number;
  externalApplyUrl: string | null;

  status: JobStatus;
  publishedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;

  organization: JobOrganization;
  recruiter: JobRecruiter;
  applicants?: number;
  _count: {
    jobApplications: number;
  };
}
