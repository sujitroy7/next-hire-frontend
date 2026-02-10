"use client";

import { useAppSelector } from "@/store/hooks";
import { useGetMeQuery } from "@/store/services/userApi";
import { UserType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserType[]; // if empty, allows any authenticated user
}

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (loading) return;

    // 1. Check if user is logged in
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // 2. Check if user has the required role (if roles are specified)
    if (allowedRoles && user && !allowedRoles.includes(user.userType)) {
      router.replace("/unauthorized"); // Create this page later
    }
  }, [loading, isAuthenticated, user, allowedRoles, router]);

  // Show loader while checking
  if (
    loading ||
    !isAuthenticated ||
    (user && !allowedRoles.includes(user.userType))
  ) {
    return (
      <div className="flex h-screen items-center justify-center">
        Checking permissions...
      </div>
    );
  }

  return children;
}
