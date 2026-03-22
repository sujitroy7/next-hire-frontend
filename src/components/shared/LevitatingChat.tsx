"use client";

import { useChatLogic } from "./levitating-chat/use-chat-logic";
import { ChatToggleButton } from "./levitating-chat/chat-toggle-button";
import { ChatWindow } from "./levitating-chat/chat-window";

export function LevitatingChat() {
  const { isOpen, setIsOpen } = useChatLogic();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ChatToggleButton isOpen={isOpen} onOpen={() => setIsOpen(true)} />
    </div>
  );
}
