import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";
import { UserRoleEnum, type PermissionsTokenPayload } from "@/types/auth";

// 1. Define Public Routes (The Whitelist)
const publicRoutes = [
  /^\/$/, // Landing Page
  /^\/login$/, // Login
  /^\/register$/, // Register
  /^\/candidate\/profile\/[^/]+$/, // Matches /candidate/profile/123, but NOT /candidate/profile/123/edit
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Check if the current path is public
  const isPublic = publicRoutes.some((route) => route.test(pathname));

  if (isPublic) {
    return NextResponse.next();
  }

  // 3. If NOT public, enforce Authentication
  const permissionsToken = request.cookies.get("permissions-token")?.value;
  if (!permissionsToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. Role-Based Access Control (RBAC) Logic
  try {
    const payload = decodeJwt(permissionsToken) as PermissionsTokenPayload;
    const userRole = payload.role;

    // Role-Based Redirects
    // If a candidate tries to access /recruiter, kick them out
    if (
      pathname.startsWith("/recruiter") &&
      userRole !== UserRoleEnum.RECRUITER
    ) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (
      pathname.startsWith("/candidate") &&
      userRole !== UserRoleEnum.CANDIDATE
    ) {
      console.log("test0log", payload);
      // Exception: /candidate/profile/:id is public, already handled above if it matches
      // But if we are here, it means it didn't match the public regex (e.g. /candidate/dashboard)
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (pathname.startsWith("/org") && userRole !== UserRoleEnum.ORGANIZATION) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } catch (error) {
    console.error("Middleware JWT Decode Error:", error);
    // If token is invalid/expired, redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Keep the matcher simple to exclude assets
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
