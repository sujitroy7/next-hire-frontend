import { cn } from "@/lib/utils";
import Link from "next/link";

export interface NavItemButtonProps {
  label: string;
  href: string;
  icon: React.ElementType;
}

export default function NavItemButton({
  item,
  collapsed,
  active,
}: {
  item: NavItemButtonProps;
  collapsed: boolean;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={item.href as never}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          collapsed && "justify-center px-0",
          active
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
        )}
        title={collapsed ? item.label : undefined}
      >
        <item.icon
          className={cn("size-4 shrink-0", active && "text-sidebar-primary")}
          strokeWidth={active ? 2 : 1.5}
        />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    </li>
  );
}
