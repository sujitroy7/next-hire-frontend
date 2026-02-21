import AboutUs from "./_components/about-us";
import ContactInfoSidebar from "./_components/contact-info-sidebar";
import Header from "./_components/header";
import OrgGallery from "./_components/gallery";
import { getSession } from "@/lib/auth";
import { getOrganizationProfileById } from "@/services/organizationApi";
import { serverAxios } from "@/lib/server-axios";
import { notFound, redirect } from "next/navigation";
import { isAxiosError } from "axios";
import { OrganizationType } from "@/types/organization";

export default async function OrganizationProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: profileId } = await params;
  const { userId } = await getSession();
  const isProfileOwner = userId === profileId;

  let data;
  try {
    const response = await getOrganizationProfileById(serverAxios, profileId);
    if (response.data.status !== "success") {
      notFound();
    }
    data = response.data.data;
  } catch (error) {
    console.log(error);
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        if (profileId === userId) {
          redirect(`/org/profile/${profileId}/edit` as any);
        }
        notFound();
      }
      if (status === 401) {
        redirect("/unauthorized" as any);
      }
      throw new Error("Server error. Please try again later.");
    }
    throw error;
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Section */}
        <Header
          profileId={profileId}
          isProfileOwner={isProfileOwner}
          name={data?.name}
          isVerified={data?.isVerified || false}
          organizationType={data?.organizationType as OrganizationType}
          location={
            data?.address
              ? [data?.address?.city, data?.address?.country].join(", ")
              : ""
          }
        />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="md:col-span-2 space-y-6">
            <AboutUs about={data.about || ""} />
            <OrgGallery images={data.galleryImages || []} />
          </div>
          {/* Sidebar - Right Column */}
          <ContactInfoSidebar
            websiteUrl={data.websiteUrl}
            linkedinUrl={data.linkedinUrl}
            publicEmail={data.publicEmail}
            publicPhone={data.publicPhone}
            createdAt={data?.createdAt}
            employeeCount={data.employeeCount || ""}
          />
        </div>
      </div>
    </div>
  );
}
