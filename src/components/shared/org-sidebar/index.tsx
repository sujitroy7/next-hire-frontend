"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, Building2, Users, Briefcase } from "lucide-react";
import { useState } from "react";
import ToggleSidebar from "./ToggleSidebar";
import NavItemButton, { NavItemButtonProps } from "./NavItemButton";
import UserProfile from "./UserFooter";
import UserHeader from "./UserHeader";

const NAV_ITEMS: NavItemButtonProps[] = [
  { label: "Dashboard", href: "/org/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/org/profile", icon: Building2 },
  { label: "Recruiters", href: "/org/recruiters", icon: Users },
  { label: "Jobs", href: "/org/jobs", icon: Briefcase },
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

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]",
      )}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      <UserHeader collapsed={collapsed} />

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href, pathname);
            return (
              <NavItemButton
                key={item.label}
                item={item}
                collapsed={collapsed}
                active={active}
              />
            );
          })}
        </ul>
      </nav>
      {/* ── Collapse Toggle ─────────────────────────────────── */}
      <ToggleSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Separator />
      {/* ── User Footer ─────────────────────────────────────── */}
      <UserProfile collapsed={collapsed} />
    </aside>
  );
}
