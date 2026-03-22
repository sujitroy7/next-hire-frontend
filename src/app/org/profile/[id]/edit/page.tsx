import { Metadata } from "next";
import EditOrgProfileForm from "./_components/edit-profile-form";
import { getSession } from "@/lib/auth";
import { serverAxios } from "@/lib/server-axios";
import { getOrganizationProfileById } from "@/services/organizationApi";
import { redirect } from "next/navigation";
import { formSchema } from "./_utils/schema";
import { isAxiosError } from "axios";

export const metadata: Metadata = {
  title: "Edit Organization Profile | NextHire",
  description: "Update your organization's profile information.",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOrganizationProfilePage({ params }: Props) {
  const { id: profileId } = await params;
  const session = await getSession();
  const isProfileOwner = session?.userId === profileId;
  let status: number | null = null;

  if (!isProfileOwner) {
    redirect("/unauthorized" as any);
  }

  let data;
  try {
    const response = await getOrganizationProfileById(serverAxios, profileId);
    if (response.data.status === "success") {
      data = response.data.data;
    }
    status = response.status;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.message);
      status = error.response?.status || null;
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-muted-foreground">
            Manage your organization's public information and settings.
          </p>
        </div>
        <EditOrgProfileForm
          initialData={!data ? data : formSchema.parse(data)}
          isNewProfile={status === 404}
          userId={session?.userId}
        />
      </div>
    </div>
  );
}
