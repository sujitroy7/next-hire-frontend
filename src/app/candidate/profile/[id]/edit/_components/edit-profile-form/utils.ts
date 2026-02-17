import { ProfileFormValues } from "./schema";

export const mapInitialDataToFormValues = (
  initialData: any,
): ProfileFormValues => {
  return {
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    headline: initialData?.headline || "",
    bio: initialData?.bio || "",
    publicEmail: initialData?.publicEmail || initialData?.email || "",
    publicPhone: initialData?.publicPhone || "",
    address: initialData?.address || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    websiteUrl: initialData?.websiteUrl || "",
    isOpenToWork: initialData?.isOpenToWork ?? false,
    skills: initialData?.skills ? initialData.skills.join(", ") : "",
    experiences:
      initialData?.experiences?.map((exp: any) => ({
        id: exp.id,
        jobTitle: exp.jobTitle || "",
        companyName: exp.companyName || "",
        startDate: exp.startDate
          ? new Date(exp.startDate).toISOString().split("T")[0]
          : "", // Format for date input
        endDate: exp.endDate
          ? new Date(exp.endDate).toISOString().split("T")[0]
          : "",
        isCurrent: exp.isCurrent ?? !exp.endDate,
        description: exp.description || "",
        location: exp.location || "",
      })) || [],
    educations:
      initialData?.education?.map((edu: any) => ({
        ...edu,
        schoolName: edu.schoolName || "",
        degree: edu.degree || "",
        startDate: edu.startDate
          ? new Date(edu.startDate).toISOString().split("T")[0]
          : "",
        endDate: edu.endDate
          ? new Date(edu.endDate).toISOString().split("T")[0]
          : "",
        isCurrent: edu.isCurrent ?? !edu.endDate,
      })) || [],
  };
};

export const mapFormValuesToPayload = (data: ProfileFormValues) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    headline: data.headline,
    bio: data.bio,
    publicPhone: data.publicPhone,
    publicEmail: data.publicEmail,
    linkedinUrl: data.linkedinUrl,
    websiteUrl: data.websiteUrl,
    isOpenToWork: data.isOpenToWork,
    skills: data.skills
      ? data.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    experiences: data.experiences?.map((exp) => ({
      id: exp.id,
      jobTitle: exp.jobTitle,
      companyName: exp.companyName,
      employmentType: "FULL_TIME", // Defaulting as specific type wasn't in form, can add if needed
      startDate: new Date(exp.startDate).toISOString(),
      endDate: exp.endDate ? new Date(exp.endDate).toISOString() : null,
      description: exp.description,
      location: exp.location,
    })),
    // educations: ... (if needed by backend, otherwise similar mapping)
  };
};
