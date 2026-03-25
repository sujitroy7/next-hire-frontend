"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./LogoutButton";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  collapsed: boolean;
  roleLabel: string;
}

export default function SidebarFooter({
  collapsed,
  roleLabel,
}: SidebarFooterProps) {
  const { user } = useAuth();
  const userEmail = user?.email ?? "";
  const initials = userEmail ? userEmail.substring(0, 2).toUpperCase() : "US";

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-4 shrink-0",
        collapsed && "justify-center px-2",
      )}
    >
      <Avatar className="size-8 shrink-0">
        <AvatarFallback className="text-xs font-semibold bg-sidebar-accent text-sidebar-accent-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-sidebar-foreground truncate">
            {userEmail || roleLabel}
          </p>
          <p className="text-[11px] text-muted-foreground">{roleLabel}</p>
        </div>
      )}
      {!collapsed && <LogoutButton />}
    </div>
  );
}
