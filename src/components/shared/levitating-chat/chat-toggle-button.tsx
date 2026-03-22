import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatToggleButtonProps {
  isOpen: boolean;
  onOpen: () => void;
}

export function ChatToggleButton({ isOpen, onOpen }: ChatToggleButtonProps) {
  return (
    <div
      // @ts-ignore
      inert={isOpen ? "" : undefined}
      className={`transition-all duration-300 ease-out origin-center ${
        isOpen
          ? "opacity-0 scale-50 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <Button
        onClick={onOpen}
        className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>
    </div>
  );
}
