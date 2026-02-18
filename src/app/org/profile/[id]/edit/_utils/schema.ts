import { addressSchema } from "@/schema/address";
import { EmployeeCountEnum, OrganizationTypeEnum } from "@/types/organization";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  about: z.string().min(10, {
    message: "About description must be at least 10 characters.",
  }),
  organizationType: z
    .nativeEnum(OrganizationTypeEnum, "Select valid organization type")
    .optional(),
  employeeCount: z
    .nativeEnum(EmployeeCountEnum, "Select valid employee count")
    .optional(),
  websiteUrl: z
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  publicEmail: z
    .email({ message: "Please enter a valid email." })
    .optional()
    .or(z.literal("")),
  publicPhone: z.string().optional(),
  address: addressSchema.optional(),
});

export type EditOrgProfileValues = z.infer<typeof formSchema>;
