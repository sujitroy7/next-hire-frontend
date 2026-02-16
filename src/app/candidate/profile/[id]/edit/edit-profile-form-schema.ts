import z from "zod";

const stripHtml = (value?: string) => value?.replace(/<[^>]*>?/gm, "") ?? "";

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  headline: z.string().optional(),
  bio: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (!value) return true;
        const plainTextLength = stripHtml(value).length;
        return plainTextLength <= 500;
      },
      { message: "Bio must be at most 500 characters" },
    ),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  address: z.string().optional(),
  linkedinUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  websiteUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  isOpenToWork: z.boolean(),
  skills: z.string().optional(), // Comma separated string for simplicity, or we could use array
  experiences: z
    .array(
      z.object({
        jobTitle: z.string().min(1, "Job title is required"),
        companyName: z.string().min(1, "Company name is required"),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        isCurrent: z.boolean(),
        description: z.string().optional(),
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
