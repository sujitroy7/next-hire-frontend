import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
} from "nuqs/server";
import { z } from "zod";

export const jobsSearchParams = {
  search: parseAsString.withDefault(""),
  status: parseAsString.withDefault("ALL"),
  page: parseAsInteger.withDefault(1),
};

// cache for server components
export const jobsSearchParamsCache = createSearchParamsCache(jobsSearchParams);

export const jobsZodSchema = z.object({
  search: z.string().optional().default(""),
  status: z.string().optional().default("ALL"),
  page: z.number().int().positive().optional().default(1),
});
