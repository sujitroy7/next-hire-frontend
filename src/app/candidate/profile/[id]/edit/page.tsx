import { serverAxios } from "@/lib/server-axios";
import { redirect, unauthorized } from "next/navigation";
import EditProfileForm from "./_components/edit-profile-form";
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { isAxiosError } from "axios";

export const metadata: Metadata = {
  title: "Edit Profile | NextHire",
  description: "Update your candidate profile information.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCandidateProfilePage({ params }: PageProps) {
  const { id } = await params;

  const session = await getSession();
  if (session?.userId !== id) {
    unauthorized();
  }

  let data;
  let status: number | null = null;

  try {
    const response = await serverAxios.get(`/candidate-profile/${id}`);
    if (response.data.status === "success") {
      data = response.data.data;
    }
    status = response.status;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Failed to fetch candidate profile:", error.message);
      status = error.response?.status || null;
    }
  }

  const isNewProfile = status === 404;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {isNewProfile ? "Set Up Your Profile" : "Edit Profile"}
        </h1>
        <p className="text-muted-foreground">
          {isNewProfile
            ? "Complete your profile to get started on NextHire."
            : "Update your personal information and profile details."}
        </p>
      </div>

      <EditProfileForm
        initialData={data}
        candidateId={id}
        isNewProfile={isNewProfile}
      />
    </div>
  );
}
