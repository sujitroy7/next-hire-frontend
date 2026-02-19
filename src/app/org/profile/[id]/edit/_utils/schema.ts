import { addressSchema } from "@/schema/address";
import { EmployeeCountEnum, OrganizationTypeEnum } from "@/types/organization";
import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Organization name must be at least 2 characters.",
  }),
  about: z
    .string()
    .refine((val) => (val?.replace(/<[^>]*>?/gm, "").length || 0) <= 500, {
      message: "About must be 500 characters or less.",
    })
    .optional(),
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
  address: addressSchema.nullable(),
});

export type EditOrgProfileValues = z.infer<typeof formSchema>;
