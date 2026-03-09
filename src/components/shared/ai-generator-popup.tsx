"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Sparkles } from "lucide-react";

interface AIGeneratorPopupProps {
  prompt: string;
  trigger: React.ReactNode;
  action: (prompt: string, input: string) => Promise<string>;
  children?: (props: {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
    aiResponse: string;
    isLoading: boolean;
    handleClose: () => void;
  }) => React.ReactNode;
}

export function AIGeneratorPopup({
  prompt,
  trigger,
  action,
  children,
}: AIGeneratorPopupProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // Expose the state to children using the Render Props Pattern
  const renderPropsParams = {
    input,
    setInput,
    aiResponse,
    isLoading,
    handleClose,
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const response = await action(prompt, input);
      setAiResponse(response);
    } catch (error) {
      console.error("AI Generation failed:", error);
      setAiResponse("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Generator
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-6 py-4">
          <div className="flex flex-col gap-3">
            <Textarea
              placeholder="Provide more context or instructions here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <Button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="w-full sm:w-auto self-end"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>

          {/* User's custom component passed as children with access to state */}
          {children && (
            <div className="flex flex-col gap-3 pt-4 border-t">
              {children(renderPropsParams)}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
