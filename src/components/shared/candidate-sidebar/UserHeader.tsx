import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function UserHeader({ collapsed }: { collapsed: boolean }) {
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border shrink-0",
        collapsed ? "justify-center" : "gap-3",
      )}
    >
      <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shrink-0">
        <User className="size-4" />
      </div>
      {!collapsed && (
        <div className="min-w-0">
          {user?.fullName && (
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              {user?.fullName}
            </p>
          )}
          <p className="text-xs text-muted-foreground truncate">Candidate</p>
        </div>
      )}
    </div>
  );
}
