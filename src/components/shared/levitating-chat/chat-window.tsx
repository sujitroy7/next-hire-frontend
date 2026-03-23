import { Card, CardContent } from "@/components/ui/card";
import { ChatHeader } from "./chat-header";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  return (
    <div
      className={`origin-bottom-right transition-all duration-300 ease-out absolute bottom-0 right-0 ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto mb-16"
          : "opacity-0 scale-95 translate-y-4 pointer-events-none"
      }`}
    >
      <Card className="w-80 shadow-2xl border-border">
        <ChatHeader onClose={onClose} />
        <CardContent className="p-0 flex flex-col">
          <ChatMessageList />
          <ChatInput isOpen={isOpen} />
        </CardContent>
      </Card>
    </div>
  );
}
