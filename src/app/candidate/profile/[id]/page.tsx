import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getSession } from "@/lib/auth";
import { serverAxios } from "@/lib/server-axios";
import {
  Briefcase,
  Calendar,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

// Helper function to format dates
const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "Present";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Get initials from name
const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
};

export default async function CandidateProfilePage({ params }: PageProps) {
  const { id } = await params;
  const { userId } = await getSession();
  const isProfileOwner = userId === id;

  let data;
  try {
    const response = await serverAxios.get(`/candidate-profile/${id}`);
    if (response.status !== 200) {
      notFound();
    }
    data = response.data.data;
  } catch (error) {
    console.error("Failed to fetch candidate profile data", error);
    notFound();
  }

  // Placeholder skills (will need to be added to actual data model later)
  const placeholderSkills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Left Column - Sticky Profile Card */}
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-6">
            <Card>
              <CardContent className="flex flex-col items-center pt-6 text-center">
                <Avatar className="mb-4 h-32 w-32 border-4 border-muted">
                  <AvatarImage
                    src="/placeholder-avatar.jpg"
                    alt={`${data.firstName} ${data.lastName}`}
                  />
                  <AvatarFallback className="text-4xl">
                    {getInitials(data.firstName, data.lastName)}
                  </AvatarFallback>
                </Avatar>

                <h1 className="text-2xl font-bold">
                  {data.firstName} {data.lastName}
                </h1>
                {data.headline && (
                  <p className="text-muted-foreground mt-1 text-sm font-medium">
                    {data.headline}
                  </p>
                )}

                {data.isOpenToWork && (
                  <Badge variant="default" className="mt-3">
                    Open to Work
                  </Badge>
                )}

                {isProfileOwner && (
                  <div className="mt-6 w-full space-y-3">
                    <Link href={`${id}/edit`}>
                      <Button variant="outline" className="w-full">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.publicEmail && (
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{data.publicEmail}</span>
                  </div>
                )}
                {data.publicPhone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{data.publicPhone}</span>
                  </div>
                )}
                {data.linkedinUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={data.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
                {data.websiteUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={data.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Portfolio
                    </a>
                  </div>
                )}
                {data.resumeUrl && (
                  <div className="flex items-center gap-3 text-sm">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={data.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Resume
                    </a>
                  </div>
                )}
                {!data.publicEmail &&
                  !data.publicPhone &&
                  !data.linkedinUrl &&
                  !data.websiteUrl &&
                  !data.resumeUrl && (
                    <p className="text-sm text-muted-foreground">
                      No contact information available
                    </p>
                  )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {placeholderSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column - Scrollable Content */}
        <div className="space-y-6 md:col-span-2">
          {/* About Me */}
          {data.bio && (
            <Card>
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {data.bio}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Experience */}
          {data.experiances && data.experiances.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {data.experiances.map((job, index) => (
                    <div key={index} className="relative pl-2">
                      {/* Standard Timeline Item */}
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        {/* Logo Placeholder */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-muted">
                          <Briefcase className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
                            <div>
                              <h3 className="font-semibold">{job.jobTitle}</h3>
                              <p className="text-sm text-muted-foreground">
                                {job.companyName}
                              </p>
                              {job.location && (
                                <p className="text-xs text-muted-foreground">
                                  {job.location}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {formatDate(job.startDate)} -{" "}
                                {formatDate(job.endDate)}
                              </span>
                            </div>
                          </div>

                          {job.description && (
                            <p className="text-sm text-muted-foreground">
                              {job.description}
                            </p>
                          )}
                          {job.employmentType && (
                            <Badge variant="outline" className="w-fit">
                              {job.employmentType}
                            </Badge>
                          )}
                        </div>
                      </div>
                      {index < data.experiances.length - 1 && (
                        <Separator className="my-6" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border bg-muted">
                          <GraduationCap className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">Coming Soon</h3>
                          <p className="text-sm text-muted-foreground">
                            Education data structure pending
                          </p>
                        </div>
                      </div>
                      {index < data.education.length - 1 && (
                        <Separator className="my-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
