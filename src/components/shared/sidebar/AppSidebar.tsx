"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { LucideIcon } from "lucide-react";

import ToggleSidebar from "./ToggleSidebar";
import NavItemButton, { NavItemButtonProps } from "./NavItemButton";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";

interface AppSidebarProps {
  navItems: NavItemButtonProps[];
  headerIcon: LucideIcon;
  roleLabel: string;
  /** The exact href that should match only when the pathname equals it (i.e. the dashboard route). */
  dashboardHref: string;
}

function isActive(
  href: string,
  pathname: string,
  dashboardHref: string,
): boolean {
  if (href === dashboardHref) {
    return pathname === dashboardHref;
  }
  return pathname.startsWith(href);
}

export default function AppSidebar({
  navItems,
  headerIcon,
  roleLabel,
  dashboardHref,
}: AppSidebarProps) {
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
      <SidebarHeader
        collapsed={collapsed}
        icon={headerIcon}
        roleLabel={roleLabel}
      />

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const active = isActive(item.href, pathname, dashboardHref);
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
      <SidebarFooter collapsed={collapsed} roleLabel={roleLabel} />
    </aside>
  );
}
