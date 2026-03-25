"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { LucideIcon } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  icon: LucideIcon;
  roleLabel: string;
}

export default function SidebarHeader({
  collapsed,
  icon: Icon,
  roleLabel,
}: SidebarHeaderProps) {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border shrink-0",
        collapsed ? "justify-center" : "gap-3",
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
        <Icon className="size-4" />
      </div>
      {!collapsed && (
        <div className="min-w-0">
          {user?.fullName && (
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.fullName}
            </p>
          )}
          <p className="text-xs text-muted-foreground truncate">{roleLabel}</p>
        </div>
      )}
    </div>
  );
}
