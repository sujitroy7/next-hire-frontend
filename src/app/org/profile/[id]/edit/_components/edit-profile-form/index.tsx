"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BasicInfoSection } from "./basic-info-section";
import { OrgDetailsSection } from "./org-details-section";
import AddressFormSection from "@/components/shared/address-form-section";
import { ContactInfoSection } from "./contact-info-section";
import { formSchema, EditOrgProfileValues } from "../../_utils/schema";
import {
  createOrganizationProfile,
  updateOrganizationProfile,
} from "@/services/organizationApi";
import clientAxios from "@/lib/axios";

interface EditOrgProfileFormProps {
  initialData: EditOrgProfileValues | undefined;
  isNewProfile: boolean;
  userId: string;
}

export default function EditOrgProfileForm({
  initialData,
  isNewProfile,
  userId,
}: EditOrgProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<EditOrgProfileValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: EditOrgProfileValues) {
    setIsLoading(true);

    try {
      const data = { userId, ...values };
      if (isNewProfile) {
        const response = await createOrganizationProfile(clientAxios, data);
        if (response.status === 201) {
          toast.success("Profile created successfully!");
          router.push(`/org/profile/${userId}` as any);
        }
      } else {
        const response = await updateOrganizationProfile(clientAxios, data);
        if (response.status === 200) {
          toast.success("Profile updated successfully!");
          router.push(`/org/profile/${userId}` as any);
        }
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-8">
          <BasicInfoSection control={form.control} />
          <OrgDetailsSection control={form.control} />
          <AddressFormSection<EditOrgProfileValues>
            control={form.control}
            name="address"
          />
          <ContactInfoSection control={form.control} />

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
