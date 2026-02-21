import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate, getInitials } from "@/lib/utils";
import { Recruiter } from "@/types/recruiter";
import { Pencil } from "lucide-react";
import DeleteRecruiterButton from "./delete-recruiter-button";

export default function RecruiterRow({ recruiter }: { recruiter: Recruiter }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 px-2">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-4 min-w-0">
        <Avatar size="lg">
          <AvatarFallback>
            {getInitials(recruiter.firstName, recruiter.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium leading-none truncate">
            {recruiter.firstName} {recruiter.lastName}
          </p>
          <p className="text-sm text-muted-foreground truncate mt-1">
            {recruiter.user.email}
          </p>
        </div>
      </div>

      {/* Center: Status + Joined */}
      <div className="hidden md:flex items-center gap-6">
        <Badge variant={recruiter.isActive ? "secondary" : "outline"}>
          {recruiter.isActive ? "Active" : "Inactive"}
        </Badge>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          Joined {formatDate(recruiter.user.createdAt)}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        {/* <Button variant="ghost" size="icon-sm" aria-label="Edit recruiter">
          <Pencil className="size-4" />
        </Button> */}
        <DeleteRecruiterButton userId={recruiter.userId} />
      </div>
    </div>
  );
}
