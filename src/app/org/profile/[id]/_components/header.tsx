import { MapPin, CheckCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  name: string;
  isVerified: boolean;
  organizationType?: {
    name: string;
  };
  location?: string;
}

export default function Header({
  name,
  isVerified,
  organizationType,
  location,
}: Props) {
  return (
    <div className="relative">
      {/* Cover Image Placeholder - could be added later if needed, using a gradient for now */}
      <div className="h-48 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 w-full object-cover"></div>

      <div className="absolute -bottom-12 left-8 flex items-end space-x-6">
        <Avatar className="h-32 w-32 border-4 border-background shadow-sm">
          <AvatarImage src="/placeholder-org-logo.png" alt={name} />
          <AvatarFallback className="text-3xl font-bold bg-primary text-primary-foreground">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mb-4 space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {name}
            </h1>
            {isVerified && (
              <Badge variant="secondary" className="gap-1 text-primary">
                <CheckCircle className="h-3.5 w-3.5 fill-current" />
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center text-muted-foreground text-sm gap-4">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>{organizationType?.name || "Organization"}</span>
            </div>
            {location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-4 pr-4">
        {/* Visual only button as requested */}
        <Button>Edit Profile</Button>
      </div>
    </div>
  );
}
