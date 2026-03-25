"use client";

import { Button } from "@/components/ui/button";
import LogoutButton from "./logout-button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function AuthNavOptions() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return <div className="w-20 h-6 bg-muted animate-pulse rounded-sm"></div>;

  return (
    <>
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
