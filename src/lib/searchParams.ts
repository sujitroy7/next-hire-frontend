import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from "nuqs/server";
import { z } from "zod";

export const jobsSearchParams = {
  search: parseAsString,
  status: parseAsString,
  page: parseAsInteger.withDefault(1),
};

// cache for server components
export const jobsSearchParamsCache = createSearchParamsCache(jobsSearchParams);

export const jobsZodSchema = z.object({
  search: z.string().optional().nullable().default(null),
  status: z.string().optional().nullable().default(null),
  page: z.number().int().positive().optional().default(1),
});
