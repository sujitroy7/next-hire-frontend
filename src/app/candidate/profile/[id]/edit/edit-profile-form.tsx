"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Loader2,
  Trash2,
  Plus,
  Save,
  User,
  Briefcase,
  GraduationCap,
  Contact,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Assuming sonner is used for toasts based on package.json

// --- Zod Schema ---
const profileSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  headline: z.string().optional(),
  bio: z
    .string()
    .max(500, { message: "Bio must not exceed 500 characters." })
    .optional(),
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

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  initialData: any; // Using any for flexibility with backend response type
  candidateId: string;
}

export default function EditProfileForm({
  initialData,
  candidateId,
}: EditProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transform initial data to match form schema if necessary
  const defaultValues: ProfileFormValues = {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    headline: initialData?.headline || "",
    bio: initialData?.bio || "",
    email: initialData?.publicEmail || initialData?.email || "", // Fallback to account email
    phone: initialData?.publicPhone || "",
    address: initialData?.address || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    websiteUrl: initialData?.websiteUrl || "",
    isOpenToWork: initialData?.isOpenToWork ?? false,
    skills: initialData?.skills ? initialData.skills.join(", ") : "",
    experiences:
      initialData?.experiances?.map((exp: any) => ({
        ...exp,
        startDate: exp.startDate
          ? new Date(exp.startDate).toISOString().split("T")[0]
          : "", // Format for date input
        endDate: exp.endDate
          ? new Date(exp.endDate).toISOString().split("T")[0]
          : "",
        isCurrent: exp.isCurrent ?? !exp.endDate,
      })) || [],
    educations:
      initialData?.education?.map((edu: any) => ({
        ...edu,
        startDate: edu.startDate
          ? new Date(edu.startDate).toISOString().split("T")[0]
          : "",
        endDate: edu.endDate
          ? new Date(edu.endDate).toISOString().split("T")[0]
          : "",
        isCurrent: edu.isCurrent ?? !edu.endDate,
      })) || [],
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema) as any,
    defaultValues,
    mode: "onChange",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    try {
      // Prepare data for API (e.g., convert skills string to array)
      const payload = {
        ...data,
        skills: data.skills
          ? data.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        // Ensure dates are compatible with backend
      };

      // In a real app, we would use axios here.
      // Since this is a client component, we should import a configured axios instance or use fetch.
      // For now, I'll simulate a request or assume a global axios instance is available/passed.
      // Using fetch for simplicity in this generated code snippet, matching the user's intent to just "generate the UI".

      console.log("Submitting payload:", payload);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Profile updated successfully!");
      router.refresh();
      router.push(`/candidate/profile/${candidateId}` as any);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle>Basic Information</CardTitle>
            </div>
            <CardDescription>
              Your name and how you introduce yourself to recruiters.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Jane" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="headline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Headline</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Senior Frontend Engineer | React & TypeScript Enthusiast"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief, catchy professional tagline.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About You</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell recruiters about your background, passion, and what you're looking for..."
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="flex justify-end">
                      {field.value?.length || 0}/500
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Contact className="h-5 w-5 text-primary" />
              <CardTitle>Contact Details</CardTitle>
            </div>
            <CardDescription>How recruiters can reach you.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. jane.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. +1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. https://linkedin.com/in/janedoe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio / Website</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. https://janedoe.dev" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. San Francisco, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isOpenToWork"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm md:col-span-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Open to Work</FormLabel>
                    <FormDescription>
                      Signal to recruiters that you are actively looking for new
                      opportunities.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                <CardTitle>Work Experience</CardTitle>
              </div>
              <CardDescription>Add your relevant work history.</CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendExperience({
                  jobTitle: "",
                  companyName: "",
                  startDate: "",
                  isCurrent: false,
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {experienceFields.map((field, index) => (
              <div
                key={field.id}
                className="relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:border-primary/20"
              >
                <div className="absolute right-4 top-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.jobTitle`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Job Title <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Senior Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.companyName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Acme Corp" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.startDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Start Date <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`experiences.${index}.endDate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            disabled={form.watch(
                              `experiences.${index}.isCurrent`,
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.isCurrent`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I currently work here
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name={`experiences.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your responsibilities and achievements..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
            {experienceFields.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed text-center text-muted-foreground">
                <p>No experience added yet.</p>
                <Button
                  type="button"
                  variant="link"
                  onClick={() =>
                    appendExperience({
                      jobTitle: "",
                      companyName: "",
                      startDate: "",
                      isCurrent: false,
                    })
                  }
                >
                  Add your first position
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t bg-background p-4 md:static md:border-0 md:bg-transparent md:p-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
