"use client";

import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import NavItem from "./nav-item";

export default function AuthNavOptions() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <>
      {isAuthenticated && <NavItem href={"/dashboard"} label="Dashboard" />}
      <nav className="flex items-center gap-4">
        {isAuthenticated ? (
          <LogoutButton />
        ) : (
          <>
            <Button variant="ghost" asChild className="cursor-pointer">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="cursor-pointer">
              <Link href="/register">Sign up</Link>
            </Button>
          </>
        )}
      </nav>
    </>
  );
}
