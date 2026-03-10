"use client";

import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { EditOrgProfileValues } from "../../_utils/schema";
import { AboutAIGenerator } from "./about-ai-generator";
import { useRef } from "react";
import { type Editor } from "@tiptap/react";

interface BasicInfoSectionProps {
  control: Control<EditOrgProfileValues>;
}

export function BasicInfoSection({ control }: BasicInfoSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          General details about your organization.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <AboutFormField control={control} />
      </CardContent>
    </Card>
  );
}

interface AboutFormFieldProps {
  control: Control<EditOrgProfileValues>;
}

export default function AboutFormField({ control }: AboutFormFieldProps) {
  const editorRef = useRef<{ editor: Editor }>(null);

  return (
    <FormField
      control={control}
      name="about"
      render={({ field }) => (
        <FormItem>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <FormLabel>About</FormLabel>
            <AboutAIGenerator
              onAccept={(response) => {
                field.onChange(response);
                editorRef.current?.editor.commands.setContent(response);
              }}
            />
          </div>
          <FormControl>
            <RichTextEditor
              ref={editorRef}
              value={field.value || ""}
              onChange={({ htmlValue }) => field.onChange(htmlValue)}
            />
          </FormControl>
          <FormDescription className="flex justify-end">
            {/* Strip HTML tags to accurately count text characters */}
            {field.value?.replace(/<[^>]*>?/gm, "").length || 0}/500
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
