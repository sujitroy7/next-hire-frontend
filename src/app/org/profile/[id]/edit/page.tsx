import { Metadata } from "next";
import EditOrgProfileForm from "./_components/edit-profile-form";

export const metadata: Metadata = {
  title: "Edit Organization Profile | NextHire",
  description: "Update your organization's profile information.",
};

// Mock Data (Consistent with profile page)
const mockOrgProfile = {
  name: "Acme Innovations Ltd.",
  about:
    "Acme Innovations is a forward-thinking technology company dedicated to solving the world's most complex problems through cutting-edge software solutions. We believe in innovation, integrity, and inclusivity. Our team is composed of passionate individuals who thrive on challenges and continuous learning. We are currently expanding our horizons into AI and machine learning sectors.",
  organizationType: "Technology",
  employeeCount: "51-200",
  address: {
    addressLine1: "123 Tech Avenue",
    addressLine2: "Suite 400",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
  },
  websiteUrl: "https://www.acme.inc",
  linkedinUrl: "https://linkedin.com/company/acme-inc",
  publicEmail: "contact@acme.inc",
  publicPhone: "+1 (555) 123-4567",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditOrganizationProfilePage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-muted/30 py-10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Edit Profile</h1>
          <p className="text-muted-foreground">
            Manage your organization's public information and settings.
          </p>
        </div>

        <EditOrgProfileForm initialData={mockOrgProfile} />
      </div>
    </div>
  );
}
