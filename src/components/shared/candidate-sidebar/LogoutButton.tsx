import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      className="text-muted-foreground hover:text-destructive shrink-0"
      onClick={logout}
      aria-label="Sign out"
      title="Sign out"
    >
      <LogOut className="size-3.5" />
    </Button>
  );
}
