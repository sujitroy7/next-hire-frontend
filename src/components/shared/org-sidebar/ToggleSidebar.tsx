import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export default function ToggleSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="px-3 pb-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCollapsed((prev) => !prev)}
        className={cn(
          "w-full text-muted-foreground hover:text-sidebar-foreground",
          collapsed && "px-0 justify-center",
        )}
      >
        {collapsed ? (
          <ChevronRight className="size-4" />
        ) : (
          <>
            <ChevronLeft className="size-4" />
            <span>Collapse</span>
          </>
        )}
      </Button>
    </div>
  );
}
