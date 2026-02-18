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

// Mock Data based on the provided Prisma schema
const mockOrgProfile = {
  id: "org-123",
  userId: "user-456",
  name: "Acme Innovations Ltd.",
  about:
    "Acme Innovations is a forward-thinking technology company dedicated to solving the world's most complex problems through cutting-edge software solutions. We believe in innovation, integrity, and inclusivity. Our team is composed of passionate individuals who thrive on challenges and continuous learning. We are currently expanding our horizons into AI and machine learning sectors.",
  isActive: true,
  isVerified: true,
  organizationTypeId: 1,
  organizationType: {
    id: 1,
    name: "Technology",
  },
  publicEmail: "contact@acme.inc",
  publicPhone: "+1 (555) 123-4567",
  websiteUrl: "https://www.acme.inc",
  linkedinUrl: "https://linkedin.com/company/acme-inc",
  location: "San Francisco, CA", // Added mock location for UI completeness
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2024-02-20"),
  employeeCount: "50-200", // Added mock data
  galleryImages: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  ],
};

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
