# Update Profile Modal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Figma-aligned `Update Profile` button and presentation-only modal to the existing `/profile` page with accessible open and close behavior.

**Architecture:** Keep `src/app/profile/page.tsx` as a server component and keep `ProfilePanel` mostly presentational. Add a focused client component under `src/components/profile/` that owns modal state, local form state, and close interactions, then wire it into the profile hero and style it with the existing CSS module approach.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Vitest, React Testing Library, user-event

---

### Task 1: Add the failing modal interaction test

**Files:**
- Create: `src/components/profile/__tests__/profile-update-modal.test.tsx`
- Test: `src/components/profile/__tests__/profile-update-modal.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
/* global describe, expect, it */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { currentUser, profileHighlights } from "@/lib/data";
import { ProfilePanel } from "@/components/profile/profile-panel";

describe("ProfilePanel update modal", () => {
  it("opens and closes the update profile modal", async () => {
    const user = userEvent.setup();

    render(<ProfilePanel user={currentUser} highlights={profileHighlights} />);

    await user.click(screen.getByRole("button", { name: /update profile/i }));

    expect(
      screen.getByRole("dialog", { name: /update profile/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue(currentUser.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(currentUser.email);
    expect(screen.getByLabelText(/title/i)).toHaveValue(currentUser.title);

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(
      screen.queryByRole("dialog", { name: /update profile/i }),
    ).not.toBeInTheDocument();
  });

  it("closes the modal when escape is pressed", async () => {
    const user = userEvent.setup();

    render(<ProfilePanel user={currentUser} highlights={profileHighlights} />);

    await user.click(screen.getByRole("button", { name: /update profile/i }));
    await user.keyboard("{Escape}");

    expect(
      screen.queryByRole("dialog", { name: /update profile/i }),
    ).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/components/profile/__tests__/profile-update-modal.test.tsx
```

Expected: FAIL because the `Update Profile` button and dialog do not exist yet.

- [ ] **Step 3: Commit the failing test state only after confirming RED locally**

```bash
git add src/components/profile/__tests__/profile-update-modal.test.tsx
git commit -m "test: cover profile update modal behavior"
```

Note: if you prefer to avoid a red commit, skip the commit here and commit after Task 2 instead.

### Task 2: Implement the minimal modal behavior

**Files:**
- Create: `src/components/profile/profile-update-modal.tsx`
- Modify: `src/components/profile/profile-panel.tsx`
- Test: `src/components/profile/__tests__/profile-update-modal.test.tsx`

- [ ] **Step 1: Add the client modal component**

```tsx
"use client";

import { useEffect, useState } from "react";
import type { UserProfile } from "@/types/blog";
import styles from "./profile-panel.module.css";

interface ProfileUpdateModalProps {
  user: UserProfile;
}

interface FormState {
  name: string;
  email: string;
  title: string;
}

function getInitialState(user: UserProfile): FormState {
  return {
    name: user.name,
    email: user.email,
    title: user.title,
  };
}

export function ProfileUpdateModal({ user }: ProfileUpdateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => getInitialState(user));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openModal = () => {
    setForm(getInitialState(user));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateField =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  return (
    <>
      <button type="button" className={styles.updateButton} onClick={openModal}>
        Update Profile
      </button>

      {isOpen ? (
        <div className={styles.modalBackdrop} onClick={closeModal} role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-update-modal-title"
            className={styles.profileModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="profile-update-modal-title" className={styles.modalTitle}>
                Update Profile
              </h2>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close update profile modal"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <div className={styles.modalForm}>
              <label className={styles.fieldLabel}>
                <span>Name</span>
                <input value={form.name} onChange={updateField("name")} className={styles.fieldInput} />
              </label>
              <label className={styles.fieldLabel}>
                <span>Email</span>
                <input value={form.email} onChange={updateField("email")} className={styles.fieldInput} />
              </label>
              <label className={styles.fieldLabel}>
                <span>Title</span>
                <input value={form.title} onChange={updateField("title")} className={styles.fieldInput} />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={styles.secondaryButton} onClick={closeModal}>
                Cancel
              </button>
              <button type="button" className={styles.primaryButton} onClick={closeModal}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
```

- [ ] **Step 2: Wire the trigger into the profile panel**

Update `src/components/profile/profile-panel.tsx`:

```tsx
import type { UserProfile } from "@/types/blog";
import { ProfileUpdateModal } from "./profile-update-modal";
import styles from "./profile-panel.module.css";

interface ProfilePanelProps {
  user: UserProfile;
  highlights: string[];
}

export function ProfilePanel({ user, highlights }: ProfilePanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.hero}>
        <div className={styles.heroTopRow}>
          <div className={styles.identity}>
            <span className={styles.avatar} aria-hidden="true">
              {user.initials}
            </span>
            <div>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.title}>{user.title}</p>
            </div>
          </div>
          <ProfileUpdateModal user={user} />
        </div>
        <p className={styles.bio}>{user.bio}</p>
      </div>
```

- [ ] **Step 3: Run the targeted test to verify it passes**

Run:

```bash
npm test -- src/components/profile/__tests__/profile-update-modal.test.tsx
```

Expected: PASS for both modal interaction tests.

- [ ] **Step 4: Commit the behavior change**

```bash
git add src/components/profile/profile-update-modal.tsx src/components/profile/profile-panel.tsx src/components/profile/__tests__/profile-update-modal.test.tsx
git commit -m "feat: add update profile modal behavior"
```

### Task 3: Apply Figma-aligned styling and run full verification

**Files:**
- Modify: `src/components/profile/profile-panel.module.css`
- Modify: `src/components/profile/profile-update-modal.tsx`
- Test: `src/components/profile/__tests__/profile-update-modal.test.tsx`

- [ ] **Step 1: Extend the profile CSS module for the hero action and modal**

Add styles like:

```css
.heroTopRow {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.updateButton,
.primaryButton,
.secondaryButton,
.fieldInput {
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;
}

.updateButton {
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--brand);
  color: #ffffff;
  font-size: 0.88rem;
  font-weight: 800;
  box-shadow: 0 14px 30px rgba(61, 65, 243, 0.22);
  cursor: pointer;
}

.modalBackdrop {
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(16, 20, 40, 0.36);
  backdrop-filter: blur(8px);
}

.profileModal {
  width: min(420px, 100%);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 28px 60px rgba(25, 29, 51, 0.22);
  padding: 24px;
}

.modalForm {
  margin-top: 18px;
  display: grid;
  gap: 14px;
}

.fieldLabel {
  display: grid;
  gap: 8px;
  color: var(--muted-strong);
  font-size: 0.85rem;
  font-weight: 700;
}

.fieldInput {
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  color: var(--foreground);
  background: #ffffff;
}

.modalActions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 22px;
}
```

Also add responsive support so the hero stacks on narrow screens and the trigger stretches cleanly under the identity block.

- [ ] **Step 2: Adjust the modal markup only if needed to support labels, footer layout, or button text**

Keep the structure aligned with the passing tests:

```tsx
<div className={styles.modalActions}>
  <button type="button" className={styles.secondaryButton} onClick={closeModal}>
    Cancel
  </button>
  <button type="button" className={styles.primaryButton} onClick={closeModal}>
    Update Profile
  </button>
</div>
```

- [ ] **Step 3: Run targeted and full test verification**

Run:

```bash
npm test -- src/components/profile/__tests__/profile-update-modal.test.tsx
npm test
```

Expected:

- targeted modal test passes
- full suite passes with no profile modal regressions

- [ ] **Step 4: Commit the polished UI**

```bash
git add src/components/profile/profile-panel.module.css src/components/profile/profile-update-modal.tsx
git commit -m "style: match update profile modal to figma"
```

## Self-Review

- Spec coverage check: trigger placement, modal fields, close behavior, non-persistent primary action, and testing are all covered by Tasks 1-3.
- Placeholder scan: no `TODO`, `TBD`, or undefined implementation references remain.
- Type consistency check: `ProfileUpdateModal`, `FormState`, and the CSS class names referenced in the tasks are used consistently throughout the plan.
