import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import { getSession } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function PublicNavbar() {
  const { userId } = await getSession();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2 className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">NextHire</span>
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href={"/jobs" as any}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Jobs
          </Link>
          <Link
            href={"/about" as any}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>

          {!userId ? (
            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild className="cursor-pointer">
                <Link href={"/login" as any}>Log in</Link>
              </Button>
              <Button asChild className="cursor-pointer">
                <Link href={"/register" as any}>Sign up</Link>
              </Button>
            </nav>
          ) : (
            <>
              <Link
                href={"/dashboard" as any}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
              <nav className="flex items-center gap-4">
                <LogoutButton />
              </nav>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
