---
trigger: always_on
---

# Project Context

- **Name:** NextHire
- **Type:** Job Listing Platform (Frontend)
- **Goal:** Rapid UI development for a job board where users can browse, search, and apply for jobs.
- **Design Philosophy:** Clean, accessible, modern, and mobile-responsive.

# Tech Stack (Strict)

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **State Management:** Redux Toolkit (Global UI/Auth state) + RTK Query (Data Fetching)
- **Styling:** Tailwind CSS + Shadcn UI (Radix UI based)
- **Icons:** Lucide React
- **HTTP Client:** Axios + (Wrapped in RTK Query)

# 1. Authentication & API Strategy

- **Auth Strategy:** JWT (Access Token in Memory/Redux, Refresh Token in HTTP-only Cookie).
- **Token Rotation:** handled via **Axios Interceptors**.
  - Do NOT implement refresh logic inside the RTK Query definition.
  - The Axios instance handles 401 interception and token refresh transparently.
- **RTK Query Setup:**
  - Use the existing `axiosBaseQuery` wrapper.
  - Pass the configured Axios instance (with interceptors) to this wrapper.

# 2. Forms & Validation

- **Library:** **React Hook Form** + **Zod**.
- **Components:** Strictly use Shadcn's `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, and `<FormControl>` components.
- **Pattern:**
  - Define Zod schema first (`formSchema`).
  - Use `zodResolver(formSchema)` in `useForm`.
  - Do NOT use raw `<input>` tags; wrap everything in Shadcn controls.

# 3. Routing & Structure

- **Route Groups:** Use Next.js Route Groups to organize layouts.
  - `(public)/` -> Public pages (Landing, Search).
  - `candidate/` -> Protected candidate sub-routes.
  - `recruiter/` -> Protected Recruiter sub-routes.
  - `org/` -> Protected Organization sub-routes.
- **Filtering:** **Server-Side Only.** Update URL search params to trigger data refetching.
- **Pagination:** Standard Numbered Pagination (Page 1, 2, 3). No Infinite Scroll.

# 4. UI/UX Guidelines

- **Theme:** Use CSS variables (`var(--primary)`, etc.) defined in `globals.css`.
- **Images:** Strictly use `next/image` (`<Image />`).
- **Responsiveness:** Desktop-first approach.
- **Tables:** For dashboards (e.g., "Manage Jobs"), use `@tanstack/react-table` (standard Shadcn data table).

# 5. Coding Standards

- **Testing:** SKIP all testing.
- **TypeScript:** Strictly avoid `any`. Define interfaces in `types/` or adjacent to features.
- **Imports:** Use absolute imports (`@/components/...`).
- **File Naming:** `kebab-case` for folders/files (except React components which are `PascalCase`).
