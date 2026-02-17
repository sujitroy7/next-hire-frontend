import { serverAxios } from "@/lib/server-axios";
import { notFound } from "next/navigation";
import EditProfileForm from "./_components/edit-profile-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Profile | NextHire",
  description: "Update your candidate profile information.",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditCandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  let data;

  try {
    const response = await serverAxios.get(`/candidate-profile/${id}`);

    if (response.status !== 200) {
      notFound();
    }

    data = response.data.data;
  } catch (error) {
    console.error("Failed to fetch candidate profile data for editing", error);
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-6 lg:px-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your personal information and profile details.
        </p>
      </div>

      <EditProfileForm initialData={data} candidateId={id} />
    </div>
  );
}
