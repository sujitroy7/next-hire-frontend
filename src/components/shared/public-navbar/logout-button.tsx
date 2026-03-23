"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button className="cursor-pointer" onClick={logout}>
      Logout
    </Button>
  );
}
