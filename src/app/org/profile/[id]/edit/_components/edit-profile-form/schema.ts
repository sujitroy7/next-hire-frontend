import { addressSchema } from "@/components/shared/address-form-section/schema";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  about: z.string().min(10, {
    message: "About description must be at least 10 characters.",
  }),
  organizationType: z.string().min(1, {
    message: "Please select an organization type.",
  }),
  employeeCount: z.string().min(1, {
    message: "Please select an employee count range.",
  }),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  publicEmail: z
    .string()
    .email({ message: "Please enter a valid email." })
    .optional()
    .or(z.literal("")),
  publicPhone: z.string().optional(),
  address: addressSchema,
});

export type EditOrgProfileValues = z.infer<typeof formSchema>;
