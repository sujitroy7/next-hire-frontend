"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { submitEarlyAccess } from "@/app/actions";
import { Loader2, CheckCircle2, Sparkles } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function EarlyAccessForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    const formData = new FormData();
    formData.append("email", values.email);

    try {
      const result = await submitEarlyAccess(formData);

      if (result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        setError(result.error || "Something went wrong.");
      }
    } catch (e) {
      setError("Failed to submit. Please try again.");
    }
  }

  if (isSuccess) {
    return (
      <div className="flex w-full max-w-md animate-in fade-in zoom-in duration-500 items-center justify-center gap-3 rounded-full border border-primary/20 bg-primary/10 px-6 py-4 text-sm text-primary shadow-sm mt-8">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <span className="font-medium text-base">
          You're on the list! We'll be in touch soon.
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-3 max-w-md mx-auto mt-8 relative"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1 w-full space-y-0">
              <FormControl>
                <Input
                  placeholder="Enter your email address..."
                  {...field}
                  autoComplete="email"
                  disabled={form.formState.isSubmitting}
                  className="h-12 bg-background shadow-sm border-primary/20 focus-visible:ring-primary/50 text-base px-5 rounded-full"
                />
              </FormControl>
              <FormMessage className="text-xs pt-1 absolute -bottom-5 left-5" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="h-12 rounded-full px-8 shadow-md hover:shadow-lg transition-all w-full sm:w-auto mt-2 sm:mt-0"
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          Get Early Access
        </Button>
      </form>
      {error && (
        <p className="text-sm text-destructive mt-3 font-medium text-center">
          {error}
        </p>
      )}
    </Form>
  );
}
