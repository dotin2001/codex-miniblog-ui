# Login and Register Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add frontend-only `/login` and `/register` pages that match the existing BlogHub style without using the dashboard/profile nav bar.

**Architecture:** Create a reusable auth page component under `src/components/auth/` and route pages under `src/app/login/` and `src/app/register/`. Keep auth pages static and presentational, with no API calls or backend changes.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest, Testing Library.

---

### Task 1: Shared Auth Component

**Files:**
- Create: `src/components/auth/__tests__/auth-page.test.tsx`
- Create: `src/components/auth/auth-page.tsx`
- Create: `src/components/auth/auth-page.module.css`

- [ ] **Step 1: Write the failing component test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AuthPage } from "@/components/auth/auth-page";

describe("AuthPage", () => {
  it("renders auth copy, fields, submit button, and alternate link", () => {
    render(
      <AuthPage
        eyebrow="Welcome back"
        title="Sign in to BlogHub"
        description="Access your mini blog dashboard."
        submitLabel="Sign In"
        alternatePrompt="New to BlogHub?"
        alternateHref="/register"
        alternateLabel="Create an account"
        fields={[
          { id: "email", label: "Email", type: "email", autoComplete: "email" },
          {
            id: "password",
            label: "Password",
            type: "password",
            autoComplete: "current-password",
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: /sign in to bloghub/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/password/i)).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /create an account/i })).toHaveAttribute(
      "href",
      "/register",
    );
  });
});
```

- [ ] **Step 2: Run the component test to verify red**

Run: `npm test -- src/components/auth/__tests__/auth-page.test.tsx`

Expected: FAIL because `@/components/auth/auth-page` does not exist yet.

- [ ] **Step 3: Add the component and CSS Module**

Create `src/components/auth/auth-page.tsx` with typed field definitions, semantic labels, a no-op frontend-only form submit, and `next/link` for alternate navigation.

Create `src/components/auth/auth-page.module.css` using the existing project tokens, purple gradient, rounded cards, soft shadows, and mobile breakpoints.

- [ ] **Step 4: Run the component test to verify green**

Run: `npm test -- src/components/auth/__tests__/auth-page.test.tsx`

Expected: PASS for the new auth component test.

### Task 2: App Router Login and Register Routes

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/app/register/page.tsx`

- [ ] **Step 1: Add `/login` route**

Create `src/app/login/page.tsx` that renders `AuthPage` with email and password fields, submit label `Sign In`, and alternate link to `/register`.

- [ ] **Step 2: Add `/register` route**

Create `src/app/register/page.tsx` that renders `AuthPage` with name, email, password, and confirm password fields, submit label `Create Account`, and alternate link to `/login`.

- [ ] **Step 3: Build-check routes**

Run: `npm run build`

Expected: build succeeds and route list includes `/login` and `/register`.

### Task 3: Full Verification

**Files:**
- No additional file changes expected.

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: exit code 0.

- [ ] **Step 2: Run TypeScript**

Run: `npx tsc --noEmit`

Expected: exit code 0.

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: all test files pass.

- [ ] **Step 4: Run production build**

Run: `npm run build`

Expected: exit code 0 and static routes include `/login` and `/register`.

- [ ] **Step 5: Responsive smoke check**

Run the dev server and inspect `/login` and `/register` at mobile and desktop widths. Expected: no dashboard/profile nav bar, no horizontal clipping, and styling matches the existing BlogHub UI.
