"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Save } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import clientAxios from "@/lib/axios";
import { profileFormSchema, ProfileFormValues } from "./schema";
import { BasicInfoSection } from "./basic-info-section";
import { ContactInfoSection } from "./contact-info-section";
import { ExperienceSection } from "./experience-section";
import { mapFormValuesToPayload, mapInitialDataToFormValues } from "./utils";

interface EditProfileFormProps {
  initialData: any;
  candidateId: string;
  isNewProfile: boolean;
}

export default function EditProfileForm({
  initialData,
  candidateId,
  isNewProfile,
}: EditProfileFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transform initial data to match form schema
  const defaultValues: ProfileFormValues =
    mapInitialDataToFormValues(initialData);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true);
    try {
      const payload = mapFormValuesToPayload(data);

      if (isNewProfile) {
        const response = await clientAxios.post(`/candidate-profile`, payload);

        if (response.status !== 201) {
          throw new Error("Failed to create profile");
        }

        toast.success("Profile created successfully!");
      } else {
        const response = await clientAxios.patch(
          `/candidate-profile/${candidateId}`,
          payload,
        );

        if (response.status !== 200) {
          throw new Error("Failed to update profile");
        }

        toast.success("Profile updated successfully!");
      }

      router.refresh();
      router.push(`/candidate/profile/${candidateId}` as any);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(
        isNewProfile
          ? "Failed to create profile. Please try again."
          : "Failed to update profile. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInfoSection control={form.control} />
        <ContactInfoSection control={form.control} />
        <ExperienceSection control={form.control} />

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
                {isNewProfile ? "Create Profile" : "Save Changes"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
