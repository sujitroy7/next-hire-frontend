import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
} from "nuqs/server";
import { z } from "zod";

export const jobsSearchParams = {
  search: parseAsString,
  status: parseAsString,
  workplaceType: parseAsArrayOf(parseAsString),
  employmentType: parseAsArrayOf(parseAsString),
  experienceLevel: parseAsString, // Keeping string for the slider value mapping (e.g. "0-2", "3-5")
  page: parseAsInteger.withDefault(1),
};

// cache for server components
export const jobsSearchParamsCache = createSearchParamsCache(jobsSearchParams);

export const jobsZodSchema = z.object({
  search: z.string().optional().nullable().default(null),
  status: z.string().optional().nullable().default(null),
  workplaceType: z.array(z.string()).optional().nullable().default(null),
  employmentType: z.array(z.string()).optional().nullable().default(null),
  experienceLevel: z.string().optional().nullable().default(null),
  page: z.number().int().positive().optional().default(1),
});

// ========== Candidates Search Params ==========
export const candidatesSearchParams = {
  search: parseAsString,
  status: parseAsString,
  page: parseAsInteger.withDefault(1),
};

export const candidatesSearchParamsCache = createSearchParamsCache(
  candidatesSearchParams,
);
