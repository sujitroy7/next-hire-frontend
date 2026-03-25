"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { LayoutDashboard, User } from "lucide-react";
import { useState } from "react";
import ToggleSidebar from "./ToggleSidebar";
import NavItemButton, { NavItemButtonProps } from "./NavItemButton";
import UserProfile from "./UserFooter";
import UserHeader from "./UserHeader";

const NAV_ITEMS: NavItemButtonProps[] = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/candidate/profile", icon: User },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/candidate/dashboard") {
    return pathname === "/candidate/dashboard";
  }
  return pathname.startsWith(href);
}

export default function CandidateSidebar() {
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
