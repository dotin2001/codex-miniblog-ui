# Mini Blog Design Spec

## Goal

Build a polished Next.js + TypeScript UI that follows the provided Figma file almost exactly, including:

- A `Dashboard` view with branded header, hero banner, and 6 blog cards
- A `Profile` view with the same visual system
- A blog detail modal opened by clicking a blog card
- Interactive mock data and local UI state

## Visual Direction

- Match the Figma composition, spacing, copy, and hierarchy as closely as practical
- Keep the white-surface layout, soft card borders, and saturated blue-to-violet hero gradient
- Preserve the `BlogHub` brand treatment, simple top navigation, and clean content grid
- Use restrained motion only for hover, modal transitions, and navigation feedback

## Information Architecture

### Dashboard

- Header with brand, nav items for `Dashboard` and `Profile`, and user area on the right
- Hero section with title and supporting copy
- Blog grid with six article cards laid out in two rows
- Each card shows title, summary, author row, comment count, and preview comments

### Profile

- Reuse the same application shell/header
- Present a profile-focused surface that feels part of the same product
- Include mock user information and a small editable or display-oriented profile section

### Blog Modal

- Opens from any blog card click
- Uses the Figma modal as the primary reference
- Shows article title, body summary/content, author metadata, and comments
- Must be dismissible via close button, overlay click, and `Escape`

## Interaction Model

- Route-based navigation using App Router:
  - `/` for dashboard
  - `/profile` for profile
- Blog cards open a client-side modal without leaving the dashboard page
- Hover states should feel responsive but subtle
- Responsive behavior should preserve hierarchy on smaller screens by collapsing the grid appropriately

## Technical Approach

- Use Next.js App Router with TypeScript
- Model mock content with typed domain data
- Split the UI into focused components:
  - layout shell/header
  - dashboard hero
  - blog grid/card
  - blog modal
  - profile content
- Keep styling centralized through global tokens and component-level class structure

## Testing

- Verify route rendering for dashboard and profile
- Verify clicking a blog card opens the modal
- Verify modal close behavior

## Non-Goals

- No backend, database, or authentication
- No content management features
- No divergence from the approved Figma visual direction except where needed for responsive behavior or accessibility
