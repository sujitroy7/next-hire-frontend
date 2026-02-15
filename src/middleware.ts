import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, type JWTVerifyResult } from "jose";
import { UserRoleEnum, type PermissionsTokenPayload } from "@/types/auth";
import { envRequired } from "./lib/envRequired";

// 1. Define Public Routes (The Whitelist)
const publicRoutes = [
  /^\/$/, // Landing Page
  /^\/login$/, // Login
  /^\/register$/, // Register
  /^\/candidate\/profile\/[^/]+$/, // Matches /candidate/profile/123, but NOT /candidate/profile/123/edit
];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  // clear incoming spoofed header
  requestHeaders.delete("x-user-id");
  requestHeaders.delete("x-user-role");

  const permissionsToken = request.cookies.get("permissions-token")?.value;
  let userId = null;
  let userRole = null;

  if (permissionsToken) {
    try {
      const secret = new TextEncoder().encode(
        envRequired("PERMISSIONS_JWT_SECRET"),
      );
      const { payload } = (await jwtVerify(
        permissionsToken,
        secret,
      )) as JWTVerifyResult<PermissionsTokenPayload>;

      userRole = payload.role;
      userId = payload.sub;
      requestHeaders.set("x-user-id", userId);
      requestHeaders.set("x-user-role", userRole);
    } catch (error) {}
  }

  // Procced public pages without validation
  // if user has required tokens, send userId and userRole via header regardless of the page type
  const { pathname } = request.nextUrl;

  const isPublic = publicRoutes.some((route) => route.test(pathname));
  if (isPublic) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // If NOT public, enforce Authentication
  const refreshToken = request.cookies.get("refresh-token")?.value;
  if (!userId || !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-Based Access Control (RBAC) Logic
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
    // Exception: /candidate/profile/:id is public, already handled above if it matches
    // But if we are here, it means it didn't match the public regex (e.g. /candidate/dashboard)
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/org") && userRole !== UserRoleEnum.ORGANIZATION) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
