"use client";

import { LayoutDashboard, Building2, Users, Briefcase } from "lucide-react";
import { AppSidebar, NavItemButtonProps } from "@/components/shared/sidebar";

const NAV_ITEMS: NavItemButtonProps[] = [
  { label: "Dashboard", href: "/org/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/org/profile", icon: Building2 },
  { label: "Recruiters", href: "/org/recruiters", icon: Users },
  { label: "Jobs", href: "/org/jobs", icon: Briefcase },
];

export default function OrgSidebar() {
  return (
    <AppSidebar
      navItems={NAV_ITEMS}
      headerIcon={Building2}
      roleLabel="Organization"
      dashboardHref="/org/dashboard"
    />
  );
}
