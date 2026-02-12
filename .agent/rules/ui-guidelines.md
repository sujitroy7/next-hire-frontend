---
trigger: model_decision
description: these rules should be applied while creating or updating UI
---

# UI Design Constitution & Standards

## 1. Design Philosophy & Vibe

- **Aesthetic:** Clean, minimalist, professional, and airy. "Linear-style" or "Vercel-like" design.
- **Key Principles:**
  - **Whitespace:** Use generous padding. Content should breathe. Avoid dense clusters.
  - **Borders:** Subtle, thin borders (`border-border`) over heavy drop shadows.
  - **Feedback:** Interactive elements must have hover/active states (`hover:bg-accent`).
  - **Contrast:** High contrast for text, subtle contrast for backgrounds.

## 2. Technical Stack (Strict)

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Utility-first)
- **Components:** Shadcn UI (Radix UI primitives)
- **Icons:** Lucide React (Stroke width: 1.5px or 2px consistently)

## 3. Color Palette & Theming

_Refer strictly to the CSS variables in `globals.css`_

- **Primary:** `bg-primary` / `text-primary-foreground` (Main actions, "Save", "Submit")
- **Secondary:** `bg-secondary` / `text-secondary-foreground` (Less prominent actions)
- **Muted:** `text-muted-foreground` (Subtitles, metadata, placeholders)
- **Border:** `border-border` (Dividers, card outlines)
- **Backgrounds:** - `bg-background` (Page root)
  - `bg-card` (Container elements)
  - `bg-muted/50` (Subtle alternate sections)

## 4. Typography Rules

- **Headings:** Bold, tight tracking (`tracking-tight`).
  - H1: `text-3xl font-bold tracking-tight lg:text-4xl`
  - H2: `text-2xl font-semibold tracking-tight`
  - H3: `text-xl font-semibold tracking-tight`
- **Body:** Readable, standard leading (`leading-7` for blocks).
- **Small:** `text-sm font-medium leading-none` (Labels, heavy hints).

## 5. Component Patterns

- **Cards:** - Use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
  - Always clean usage: No arbitrary margins inside the component.
- **Buttons:**
  - Default: `Button` (Primary)
  - Ghost: `variant="ghost"` (For "Cancel" or iconic actions)
  - Outline: `variant="outline"` (For secondary actions)
- **Inputs:**
  - Wrap in `FormItem` > `FormLabel` > `FormControl` > `Input` > `FormMessage` when using Forms.

## 6. Layout & Spacing

- **Container:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid System:** Use `grid` with `gap-4` or `gap-6` standard.
- **Section Spacing:** `py-12` or `py-16` for major page sections.

## 7. Accessibility (Non-negotiable)

- All images must have `alt` text.
- Interactive elements must be keyboard navigable.
- Text color must pass WCAG contrast ratios (handled mostly by Shadcn themes).
