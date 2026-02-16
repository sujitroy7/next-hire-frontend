"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  onChange: ({
    htmlValue,
    textValue,
  }: {
    htmlValue: string;
    textValue: string;
  }) => void;
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
    content: value,
    editorProps: {
      attributes: {
        // Applying shadcn-like textarea styles directly to the Tiptap editor area
        class: cn(
          "min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm prose dark:prose-invert max-w-none",
          // Add these specific list styles:
          "[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange({
        htmlValue: editor.getHTML(),
        textValue: editor.getText(),
      });
    },
  });

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-2 w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
