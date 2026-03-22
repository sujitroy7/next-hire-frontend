import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function ChatMessageList() {
  return (
    <div className="flex h-64 flex-col justify-end p-4 space-y-4 overflow-y-auto w-full">
      {/* Mock message */}
      <div className="flex w-full items-start gap-2">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
            NH
          </AvatarFallback>
        </Avatar>
        <div className="bg-muted px-3 py-2 rounded-lg text-sm rounded-tl-none text-foreground">
          Hello! How can we help you with your organization dashboard today?
        </div>
      </div>
    </div>
  );
}
