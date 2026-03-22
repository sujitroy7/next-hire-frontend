"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function LevitatingChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-2xl border-border animate-in fade-in slide-in-from-bottom-4">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-3 space-y-0">
            <CardTitle className="text-sm font-medium">Support Chat</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="flex h-64 flex-col justify-end p-4 space-y-4 overflow-y-auto w-full">
              {/* Mock message */}
              <div className="flex w-full items-start gap-2">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                    NH
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted px-3 py-2 rounded-lg text-sm rounded-tl-none text-foreground">
                  Hello! How can we help you with your organization dashboard
                  today?
                </div>
              </div>
            </div>
            <div className="p-3 border-t flex gap-2 items-center bg-background rounded-b-xl">
              <Input
                placeholder="Type a message..."
                className="flex-1 focus-visible:ring-1 bg-muted/50"
                aria-label="Message"
              />
              <Button size="icon" className="h-9 w-9 shrink-0">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  );
}
