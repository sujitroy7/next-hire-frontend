"use client";

import { AIGeneratorPopup } from "@/components/shared/ai-generator-popup";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { generateAIResponseAction } from "@/actions/ai";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { useRef } from "react";
import { type Editor } from "@tiptap/react";

interface AboutAIGeneratorProps {
  onAccept: (response: string) => void;
}

const prompt = `
Generate a professional **organization profile** for a recruitment platform using the provided company data.

Follow these instructions carefully:

1. The output **must be formatted in HTML**.
2. Use the following HTML tags only:

   * <p> for paragraphs
   * <b> for important highlighted words
   * <ul> for bullet lists
   * <li> for list items
3. Write in a **professional, clear, and engaging tone** suitable for job seekers.
4. Start with a **short introductory paragraph** about the organization.
5. Then provide **key highlights, services, mission, or strengths** in bullet points.
6. The total length of the content must be within 500 characters, excluding HTML tags.
7. Keep the content **concise, informative, and recruitment-friendly**.
8. Avoid adding any explanations outside the HTML.

Structure the output similar to this format:

<p>Introductory paragraph about the organization with some <b>important highlights</b>.</p><ul><li><p>Key point about company mission, services, or expertise.</p></li><li><p>Another key strength, achievement, or focus area.</p></li><li><p>Information about culture, innovation, impact, or industry presence.</p></li></ul><p></p>

Now generate the organization profile using the following company data:

[ORGANIZATION DATA HERE]
`;

export function AboutAIGenerator({ onAccept }: AboutAIGeneratorProps) {
  const editorRef = useRef<{ editor: Editor }>(null);

  const handleGenerate = async (finalPrompt: string) => {
    editorRef.current?.editor.commands.setContent("Generating...");
    const response = await generateAIResponseAction(finalPrompt);
    if (response.text) {
      editorRef.current?.editor.commands.setContent(response?.text);
    } else if (response.error) {
      editorRef.current?.editor.commands.setContent(response?.error);
    }
    return response;
  };

  return (
    <AIGeneratorPopup
      generatePrompt={(input) =>
        prompt.replace("[ORGANIZATION DATA HERE]", input)
      }
      action={handleGenerate}
      trigger={
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-primary"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs">Generate with AI</span>
        </Button>
      }
    >
      {({ aiResponse, isLoading, handleClose }) => (
        <div className="flex flex-col gap-4 w-full">
          <div className="space-y-2">
            <Label>Generated Output</Label>
            <RichTextEditor
              ref={editorRef}
              readonly
              className="min-h-[150px] bg-muted w-full resize-none"
            />
            {/* <Textarea
              readOnly
              value={isLoading ? "Generating..." : aiResponse}
              placeholder="AI response will appear here..."
              className="min-h-[150px] bg-muted w-full resize-none"
            /> */}
          </div>
          <Button
            type="button"
            onClick={() => {
              onAccept(aiResponse);
              handleClose();
            }}
            disabled={isLoading || !aiResponse.trim()}
            className="w-full sm:w-auto self-end"
          >
            <Check className="w-4 h-4 mr-2" />
            Accept
          </Button>
        </div>
      )}
    </AIGeneratorPopup>
  );
}
