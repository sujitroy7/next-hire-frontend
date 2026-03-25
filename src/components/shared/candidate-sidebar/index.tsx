"use client";

import { LayoutDashboard, User } from "lucide-react";
import { AppSidebar, NavItemButtonProps } from "@/components/shared/sidebar";

const NAV_ITEMS: NavItemButtonProps[] = [
  { label: "Dashboard", href: "/candidate/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/candidate/profile", icon: User },
];

export default function CandidateSidebar() {
  return (
    <AppSidebar
      navItems={NAV_ITEMS}
      headerIcon={User}
      roleLabel="Candidate"
      dashboardHref="/candidate/dashboard"
    />
  );
}
