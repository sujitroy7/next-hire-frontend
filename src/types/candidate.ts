import { EmploymentType } from "./organization";

export interface CandidateProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  headline: string | null;
  bio: string | null;
  publicPhone: string | null;
  publicEmail: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  resumeUrl: string | null;
  isActive: boolean;
  isVerified: boolean;
  isOpenToWork: boolean;
}

export interface CandidateExperiance {
  candidateProfileId: string;
  companyName: string;
  jobTitle: string;
  employmentType: EmploymentType;
  description?: string;
  location?: string;
  startDate: Date | string;
  endDate?: Date | string | null;
}

// export interface Education {
//   id: string;
//   degree: string;
//   institution: string;
//   year: string;
// }

export type ApplicationStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "REJECTED"
  | "HIRED";

export interface OrganizationCandidate {
  id: string;
  status: ApplicationStatus;
  appliedAt: string;
  resumeUrl: string;
  candidate: {
    id: string;
    firstName: string;
    lastName: string;
    headline: string | null;
    publicEmail: string | null;
  };
  job: {
    id: string;
    title: string;
  };
}
