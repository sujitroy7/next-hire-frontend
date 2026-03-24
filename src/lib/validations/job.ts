import { z } from "zod";

export const EmploymentTypeEnum = z.enum([
  "FULL_TIME",
  "PART_TIME",
  "INTERNSHIP",
  "CONTRACTUAL",
]);

export const WorkplaceTypeEnum = z.enum(["REMOTE", "HYBRID", "ON_SITE"]);

export const ExperienceLevelEnum = z.enum([
  "UNDER_1_YEAR",
  "YEARS_1_TO_2",
  "YEARS_2_TO_3",
  "YEARS_3_TO_5",
  "YEARS_5_TO_10",
  "YEARS_10_PLUS",
]);

export const SalaryIntervalEnum = z.enum(["HOURLY", "MONTHLY", "YEARLY"]);

export const CurrencyEnum = z.enum(["USD", "EUR", "GBP", "JPY", "INR"]);

export const baseJobSchema = z.object({
  title: z
    .string()
    .min(3, "Job title must be at least 3 characters")
    .max(255, "Job title is too long"),
  description: z
    .string()
    .min(10, "Job description must be at least 10 characters"),
  department: z.string().max(255, "Department is too long").optional(),
  location: z.string().max(255, "Location is too long").optional(),
  workplaceType: WorkplaceTypeEnum.optional().default("ON_SITE"),
  employmentType: EmploymentTypeEnum,
  experienceLevel: ExperienceLevelEnum.optional(),
  currency: CurrencyEnum.optional().default("USD"),
  salaryMin: z.coerce.number().int().positive().optional().or(z.literal("")),
  salaryMax: z.coerce.number().int().positive().optional().or(z.literal("")),
  salaryInterval: SalaryIntervalEnum.optional(),
  skills: z.preprocess(
    (val) =>
      typeof val === "string"
        ? val
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
        : val,
    z.array(z.string()).optional().default([]),
  ),
  vacancies: z.coerce.number().int().positive().optional().default(1),
  externalApplyUrl: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  publishedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional(),
});

export const createJobSchema = baseJobSchema
  .extend({
    publishImmediately: z.boolean().default(true),
  })
  .refine(
    (data) => {
      if (!data.salaryMin || !data.salaryMax) return true;
      return Number(data.salaryMin) <= Number(data.salaryMax);
    },
    {
      message: "salaryMin cannot be greater than salaryMax",
      path: ["salaryMin"],
    },
  );

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const JobStatusEnum = z.enum(["PUBLISHED", "CLOSED"]);

export const editJobSchema = baseJobSchema
  .extend({
    status: JobStatusEnum,
  })
  .refine(
    (data) => {
      if (!data.salaryMin || !data.salaryMax) return true;
      return Number(data.salaryMin) <= Number(data.salaryMax);
    },
    {
      message: "salaryMin cannot be greater than salaryMax",
      path: ["salaryMin"],
    },
  );

export type EditJobValues = z.infer<typeof editJobSchema>;
