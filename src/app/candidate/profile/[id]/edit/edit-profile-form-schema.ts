import z from "zod";

const stripHtml = (value?: string) => value?.replace(/<[^>]*>?/gm, "") ?? "";

export const profileFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  headline: z.string().nullable().optional(),
  bio: z
    .string()
    .nullable()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const plainTextLength = stripHtml(value).length;
        return plainTextLength <= 500;
      },
      { message: "Bio must be at most 500 characters" },
    ),
  publicEmail: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .nullable()
    .optional()
    .or(z.literal("")),
  publicPhone: z.string().nullable().optional(),
  address: z.string().optional(), // Kept for frontend state, might not be in backend schema snippet but good to have
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .nullable()
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .nullable()
    .optional()
    .or(z.literal("")),
  isOpenToWork: z.boolean().optional(),
  skills: z.string().optional(),
  experiences: z
    .array(
      z.object({
        id: z.string().optional(),
        jobTitle: z.string().min(1, "Job title is required"), // Maps to 'role'
        companyName: z.string().min(1, "Company name is required"), // Maps to 'company'
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().nullable().optional(),
        isCurrent: z.boolean().optional(),
        description: z.string().nullable().optional(),
        location: z.string().nullable().optional(),
      }),
    )
    .optional(),
  educations: z
    .array(
      z.object({
        schoolName: z.string().min(1, "School name is required"),
        degree: z.string().min(1, "Degree is required"),
        fieldOfStudy: z.string().optional(),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        isCurrent: z.boolean(),
      }),
    )
    .optional(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
