import Link from "next/link";
import { Building2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import NavItem from "./nav-item";
import { getSession } from "@/lib/auth";
import { redirectionPages } from "@/constants/redirects";

const AuthNavOptions = dynamic(() => import("./auth-nav-options"));

export default async function CommonNavbar() {
  const session = await getSession();

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
          <NavItem href="/jobs" label="Jobs" />
          <NavItem href="/about" label="About" />
          {session?.userRole && (
            <NavItem
              href={redirectionPages[session.userRole].path}
              label={redirectionPages[session.userRole].label}
            />
          )}
          <Suspense fallback={null}>
            <AuthNavOptions />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
