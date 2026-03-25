"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export default function UserFooter({ collapsed }: { collapsed: boolean }) {
  const { user } = useAuth();
  const userEmail = user?.email ?? "";
  const userInitials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "US";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-4 shrink-0",
        collapsed && "justify-center px-2",
      )}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className="text-xs font-semibold bg-sidebar-accent text-sidebar-accent-foreground">
          {userInitials}
        </AvatarFallback>
      </Avatar>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sidebar-foreground truncate">
            {userEmail || "Candidate"}
          </p>
          <p className="text-[11px] text-muted-foreground">Candidate</p>
        </div>
      )}
      {!collapsed && <LogoutButton />}
    </div>
  );
}
