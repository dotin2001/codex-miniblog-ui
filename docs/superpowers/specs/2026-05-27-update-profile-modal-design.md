# Update Profile Modal Design

## Summary

Add a Figma-matched `Update Profile` trigger and modal to the existing `/profile` page. This first pass is presentation-only: the modal opens from the profile hero, shows prefilled fields from the current user data, and closes on cancel, close, backdrop click, `Escape`, or the primary action.

## Goals

- Match the visual structure of the Figma modal referenced by node `30:26`
- Keep the `/profile` route structure unchanged
- Reuse the app's existing modal interaction pattern where practical
- Keep profile data read-only for now while presenting editable-looking fields

## Non-Goals

- Persisting profile updates
- Wiring server actions, API routes, or client-side data mutation
- Adding route-driven modal state or deep linking
- Refactoring unrelated profile page layout

## Current Context

- The app uses Next.js App Router with `/src/app/profile/page.tsx` as a server component page.
- `ProfilePanel` currently renders static profile content with no client-side state.
- `BlogDashboard` already implements the app's modal behavior, including `Escape` handling and `body.modal-open`.
- Global modal body locking already exists in `src/app/globals.css`.

## Recommended Approach

Introduce a small client component dedicated to the update-profile interaction and render it inside the existing profile hero.

This keeps the server/client boundary tight:

- `/src/app/profile/page.tsx` remains a server component
- `ProfilePanel` remains mostly presentational
- The new client component owns modal open state, close handlers, and form field rendering

This is lower risk than converting the entire profile panel to a client component and simpler than introducing route-based modal state.

## UI Structure

### Trigger Placement

Place an `Update Profile` button in the hero section of the profile panel, aligned with the existing identity block so it reads as a profile-level action.

### Modal Composition

The modal should contain:

- A dimmed full-screen backdrop
- A centered white dialog
- A header with `Update Profile` title and close button
- Three stacked form fields matching the Figma layout:
  - `Name`
  - `Email`
  - `Title`
- A footer with `Cancel` and a purple primary `Update Profile` button

### Field Behavior

- Inputs are prefilled from `currentUser`
- Inputs are editable locally so the UI feels authentic
- No submitted state is persisted back to the profile page in this phase
- Clicking the primary action closes the modal without mutating page content

## Component Boundaries

### `ProfilePanel`

- Keep the current section and card layout
- Add the new trigger/modal component within the hero area
- Pass the current user data needed to prefill the modal

### New client component

Add a focused component, for example `profile-update-modal.tsx`, responsible for:

- `isOpen` state
- local form state seeded from props
- close handlers
- rendering the button, backdrop, dialog, and actions

### Styling

Add modal-specific styles to the profile CSS module or a dedicated CSS module if separation improves readability. Prefer local module styles over new global rules, except for reusing existing `body.modal-open`.

## Interaction Details

- Open modal from the `Update Profile` trigger
- Close on:
  - close button
  - `Cancel`
  - clicking the backdrop
  - pressing `Escape`
  - clicking the primary action in this first pass
- Prevent background scroll while open by reusing the existing `modal-open` body class pattern
- Keep dialog accessible with `role="dialog"`, `aria-modal="true"`, and a stable title association

## Visual Direction

Match the visible Figma thumbnail characteristics:

- compact centered dialog
- soft corner radius
- light shadow
- restrained spacing
- small field labels above inputs
- muted neutral field borders
- purple primary button consistent with the current brand palette

The modal should feel closer to the Figma profile modal than to the larger blog post modal, while still using the same product color system already present in the app.

## Data Flow

- Server page reads `currentUser`
- `ProfilePanel` receives `user`
- Modal component receives `user` as props
- Modal initializes local input state from `user`
- Local state is discarded when the modal closes

No data leaves the component in this phase.

## Error Handling

There is no remote failure path in this phase. The main correctness concerns are UI behavior:

- ensure body scroll lock is always cleaned up on close/unmount
- ensure `Escape` listener is attached only while open
- ensure backdrop clicks close the dialog but internal clicks do not

## Testing

Add a focused component test covering:

- the `Update Profile` trigger is rendered on the profile page
- clicking the trigger opens the dialog
- the dialog exposes the expected title and buttons
- clicking close or cancel closes the dialog

Optional if straightforward in the same test file:

- pressing `Escape` closes the dialog

Do not add tests for persistence because persistence is explicitly out of scope.

## Files Expected To Change

- `src/components/profile/profile-panel.tsx`
- `src/components/profile/profile-panel.module.css`
- new client modal component under `src/components/profile/`
- test file for the modal interaction

## Acceptance Criteria

- `/profile` shows a visible `Update Profile` button in the hero area
- activating the button opens a modal visually aligned with the referenced Figma design
- modal fields are prefilled from the current profile data
- modal closes via close button, cancel, backdrop, and `Escape`
- primary action does not yet persist any change
- existing profile content remains unchanged after closing the modal
