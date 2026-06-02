# Login and Register Pages Design

## Scope

Add frontend-only authentication pages at `/login` and `/register` for the existing BlogHub Next.js App Router project. These pages must not connect to APIs, touch backend code, or change the dashboard/profile architecture.

## Visual Direction

The pages will preserve the current project style:

- Manrope typography from the root layout.
- Purple brand gradient, soft shadows, rounded panels, and muted text colors from `globals.css`.
- CSS Modules for styling, matching the existing component pattern.
- Standalone auth experience with no dashboard/profile top navigation bar.

## Routes

- `src/app/login/page.tsx` renders the login page.
- `src/app/register/page.tsx` renders the register page.

Both routes remain static frontend pages.

## Components

Create a small auth component surface under `src/components/auth/`:

- `auth-page.tsx`: reusable presentational wrapper for the auth page shell, brand area, intro copy, and form card.
- `auth-page.module.css`: shared CSS Module for login/register layout, form fields, buttons, links, and responsive behavior.

The component will accept page-specific labels, field definitions, submit text, and alternate-page link content.

## Form Behavior

Forms are intentionally frontend-only:

- Login fields: email, password.
- Register fields: name, email, password, confirm password.
- Inputs are semantic and accessible with labels.
- Submit buttons do not call APIs.
- The form can use a no-op submit handler or static markup if no client-side behavior is needed.

## Navigation

- Login links to `/register`.
- Register links to `/login`.
- No auth page uses `AppShell` or `TopNav`.

## Testing and Verification

After implementation:

- Run `npm run lint`.
- Run `npx tsc --noEmit`.
- Run `npm test`.
- Run `npm run build`.
- Smoke-check `/login` and `/register` render in the browser at mobile and desktop widths.

## Non-Goals

- No backend changes.
- No API integration.
- No authentication state.
- No validation logic beyond basic browser input types.
- No redesign of existing dashboard/profile pages.
