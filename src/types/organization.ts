import { Address } from "./common";

export enum EmploymentEnum {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  INTERNSHIP = "INTERNSHIP",
  CONTRACTUAL = "CONTRACTUAL",
}
export type EmploymentType = keyof typeof EmploymentEnum;

export enum OrganizationTypeEnum {
  TECHNOLOGY = "TECHNOLOGY",
  FINANCE = "FINANCE",
  HEALTHCARE = "HEALTHCARE",
  EDUCATION = "EDUCATION",
  RETAIL = "RETAIL",
  MANUFACTURING = "MANUFACTURING",
  GOVERNMENT = "GOVERNMENT",
  NON_PROFIT = "NON_PROFIT",
  OTHER = "OTHER",
}
export type OrganizationType = keyof typeof OrganizationTypeEnum;

export enum EmployeeCountEnum {
  RANGE_1_10 = "RANGE_1_10",
  RANGE_11_50 = "RANGE_11_50",
  RANGE_51_200 = "RANGE_51_200",
  RANGE_201_500 = "RANGE_201_500",
  RANGE_501_PLUS = "RANGE_501_PLUS",
}
export type EmployeeCountType =
  (typeof EmployeeCountEnum)[keyof typeof EmployeeCountEnum];

export interface OrganizationProfile {
  id: string;
  userId: string;
  name: string;
  about: string;
  isActive: boolean;
  isVerified: boolean;
  organizationTypeId?: OrganizationType;
  logoUrl?: string;
  employeeCount: EmployeeCountType;
  galleryImages?: string[];
  websiteUrl?: string;
  linkedinUrl?: string;
  publicEmail?: string;
  publicPhone?: string;
  createdAt: string;
  updatedAt: string;
  address?: Address;
}
