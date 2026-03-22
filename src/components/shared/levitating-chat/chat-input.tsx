"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const formSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

interface ChatInputProps {
  isOpen: boolean;
}

export function ChatInput({ isOpen }: ChatInputProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const messageStr = form.watch("message");
  const isSendDisabled = !messageStr || messageStr.trim() === "";

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => form.setFocus("message"), 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: wire up RTK query here in the future
    console.log("Submit message:", values.message);
    form.reset();
    form.setFocus("message");
  }

  return (
    <div className="p-3 border-t bg-background rounded-b-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Type a message..."
                    className="focus-visible:ring-1 bg-muted/50 w-full"
                    autoComplete="off"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            size="icon"
            className="h-9 w-9 shrink-0"
            disabled={isSendDisabled}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}
