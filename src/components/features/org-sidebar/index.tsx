"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/org/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/org/profile", icon: Building2 },
  { label: "Recruiters", href: "/org/recruiters", icon: Users },
  { label: "Jobs", href: "/org/jobs", icon: Briefcase },
  { label: "Settings", href: "/org/settings", icon: Settings },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/org/dashboard") {
    return pathname === "/org/dashboard";
  }
  return pathname.startsWith(href);
}

export default function OrgSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();

  const userEmail = user?.email ?? "";
  const orgInitials = userEmail
    ? userEmail.substring(0, 2).toUpperCase()
    : "OR";

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]",
      )}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center h-16 px-4 border-b border-sidebar-border shrink-0",
          collapsed ? "justify-center" : "gap-3",
        )}
      >
        <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
          <Building2 className="size-4" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            {user?.fullName && (
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {user?.fullName}
              </p>
            )}
            <p className="text-xs text-muted-foreground truncate">
              Organization
            </p>
          </div>
        )}
      </div>

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href as never}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon
                    className={cn(
                      "size-4 shrink-0",
                      active && "text-sidebar-primary",
                    )}
                    strokeWidth={active ? 2 : 1.5}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Collapse Toggle ─────────────────────────────────── */}
      <div className="px-3 pb-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed((prev) => !prev)}
          className={cn(
            "w-full text-muted-foreground hover:text-sidebar-foreground",
            collapsed && "px-0 justify-center",
          )}
        >
          {collapsed ? (
            <ChevronRight className="size-4" />
          ) : (
            <>
              <ChevronLeft className="size-4" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>

      <Separator />

      {/* ── User Footer ─────────────────────────────────────── */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-4 shrink-0",
          collapsed && "justify-center px-2",
        )}
      >
        <Avatar className="size-8 shrink-0">
          <AvatarFallback className="text-xs font-semibold bg-sidebar-accent text-sidebar-accent-foreground">
            {orgInitials}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">
              {userEmail || "Organization"}
            </p>
            <p className="text-[11px] text-muted-foreground">Admin</p>
          </div>
        )}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-destructive shrink-0"
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="size-3.5" />
          </Button>
        )}
      </div>
    </aside>
  );
}
