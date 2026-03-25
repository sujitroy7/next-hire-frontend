"use client";

import { LayoutDashboard, Users, Briefcase } from "lucide-react";
import { AppSidebar, NavItemButtonProps } from "@/components/shared/sidebar";

const NAV_ITEMS: NavItemButtonProps[] = [
  { label: "Dashboard", href: "/recruiter/dashboard", icon: LayoutDashboard },
  { label: "Jobs", href: "/recruiter/jobs", icon: Briefcase },
  { label: "Candidates", href: "/recruiter/candidates", icon: Users },
];

export default function RecruiterSidebar() {
  return (
    <AppSidebar
      navItems={NAV_ITEMS}
      headerIcon={Briefcase}
      roleLabel="Recruiter"
      dashboardHref="/recruiter/dashboard"
    />
  );
}
