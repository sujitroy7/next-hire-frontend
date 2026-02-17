import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, Globe, Linkedin, Mail, Phone, Users } from "lucide-react";

interface Props {
  websiteUrl?: string;
  linkedinUrl?: string;
  publicEmail?: string;
  publicPhone?: string;
  createdAt: Date;
  employeeCount: string;
}

export default function ContactInfoSidebar({
  websiteUrl,
  linkedinUrl,
  publicEmail,
  publicPhone,
  createdAt,
  employeeCount,
}: Props) {
  return (
    <div className="space-y-6">
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-base">Contact & Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {websiteUrl && (
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  Website
                </span>
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline font-medium break-all"
                >
                  {websiteUrl.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          )}

          {linkedinUrl && (
            <div className="flex items-start gap-3">
              <Linkedin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  LinkedIn
                </span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-primary hover:underline font-medium break-all"
                >
                  linkedin.com/company/...
                </a>
              </div>
            </div>
          )}

          {publicEmail && (
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  Email
                </span>
                <a
                  href={`mailto:${publicEmail}`}
                  className="text-sm text-foreground hover:text-primary transition-colors break-all"
                >
                  {publicEmail}
                </a>
              </div>
            </div>
          )}

          {publicPhone && (
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-muted-foreground">
                  Phone
                </span>
                <span className="text-sm text-foreground">{publicPhone}</span>
              </div>
            </div>
          )}

          <Separator className="my-2" />

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Joined
              </span>
              <span className="text-sm text-foreground">
                {createdAt.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground">
                Company Size
              </span>
              <span className="text-sm text-foreground">
                {employeeCount} Employees
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
