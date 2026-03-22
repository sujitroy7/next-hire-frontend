import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMac } from "@/hooks/use-is-mac";

interface ChatHeaderProps {
  onClose: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  const isMac = useIsMac();
  return (
    <CardHeader className="flex flex-row items-center justify-between border-b pb-3 space-y-0">
      <div className="flex items-center gap-2">
        <CardTitle className="text-sm font-medium">Support Chat</CardTitle>
        <span className="rounded bg-muted border px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground shadow-sm">
          {isMac ? "⌘K" : "Ctrl+K"}
        </span>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
        <X className="h-4 w-4" />
        <span className="sr-only">Close chat</span>
      </Button>
    </CardHeader>
  );
}
