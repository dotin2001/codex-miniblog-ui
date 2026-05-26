# Mini Blog UI

A front-end mini blog interface built with Next.js, React, and TypeScript. The app includes a dashboard of mock blog posts, a shared application shell, a profile page, and a client-side blog detail modal.

## Features

- Dashboard route at `/` with hero section and blog card grid
- Profile route at `/profile` using the same shared layout
- Blog detail modal with close button, overlay click, and `Escape` support
- Typed mock data for posts, comments, and user profile content
- Component-scoped styling with CSS modules
- Basic UI test coverage with Vitest and Testing Library

## Tech Stack

- Next.js 16
- React 19
- TypeScript 5
- ESLint 9
- Vitest 3
- Testing Library

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install

```bash
npm install
```

### Run the app

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Project Structure

```text
src/
  app/
    page.tsx
    profile/page.tsx
  components/
    blog/
    layout/
    profile/
  lib/
    data.ts
  types/
    blog.ts
docs/
  superpowers/
```

## Notes

- This project currently uses mock data only.
- There is no backend, authentication, or CMS integration.
- The UI is organized around reusable layout and feature components.
