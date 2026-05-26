import type { BlogPost, UserProfile } from "@/types/blog";

export const currentUser: UserProfile = {
  name: "Alex Morgan",
  initials: "A",
  title: "Product Designer & Technical Writer",
  bio: "Passionate about thoughtful product writing, frontend systems, and turning complex ideas into helpful experiences.",
  location: "San Francisco, CA",
  email: "alex.morgan@bloghub.dev",
  website: "bloghub.dev/alex-morgan",
};

export const blogPosts: BlogPost[] = [
  {
    id: "react-18",
    title: "Getting Started with React 18",
    excerpt:
      "Learn the fundamentals of React 18 and explore the new concurrent features that improve responsiveness and rendering.",
    detail:
      "React 18 introduced concurrent rendering and a more responsive mental model for building interfaces. This article walks through the practical changes, when to adopt them, and how they improve the developer experience for interactive products.",
    author: "Alex Morgan",
    authorInitials: "A",
    commentsCount: 3,
    comments: [
      { id: "r1", author: "Sarah Chen", body: "Great overview. Very helpful for beginners." },
      { id: "r2", author: "Mike Johnson", body: "The concurrent features are game-changing." },
      { id: "r3", author: "Elena Torres", body: "Clear examples and easy to follow." },
    ],
  },
  {
    id: "css-2026",
    title: "Modern CSS Techniques for 2026",
    excerpt:
      "Discover the latest CSS features including container queries, cascade layers, and layout strategies for scalable systems.",
    detail:
      "Modern CSS gives teams much better control over layout, scope, and component-level responsiveness. This modal dives into container queries, layering, and how to keep a design system tidy without overengineering every style rule.",
    author: "Sarah Chen",
    authorInitials: "S",
    commentsCount: 2,
    comments: [
      { id: "c1", author: "Alex Morgan", body: "Container queries are exactly what we needed." },
      { id: "c2", author: "David Park", body: "Excellent examples throughout." },
    ],
  },
  {
    id: "node-api",
    title: "Building Scalable APIs with Node.js",
    excerpt:
      "Best practices for designing and implementing RESTful APIs that can handle growth, versioning, and reliability.",
    detail:
      "API scale is rarely just about throughput. This article focuses on consistency, predictable contracts, observability, and team-friendly patterns that keep Node.js services maintainable as product scope expands.",
    author: "Mike Johnson",
    authorInitials: "M",
    commentsCount: 1,
    comments: [
      { id: "n1", author: "Emma Davis", body: "The section on caching strategies was super useful." },
    ],
  },
  {
    id: "ts-patterns",
    title: "TypeScript Advanced Patterns",
    excerpt:
      "Explore advanced TypeScript patterns including conditional types, mapped types, and scalable domain modeling.",
    detail:
      "Strong TypeScript architecture keeps UI code safe without making it hard to work in. The piece covers practical patterns for reusable types, domain modeling, and keeping editor feedback sharp as a project grows.",
    author: "Emma Davis",
    authorInitials: "E",
    commentsCount: 3,
    comments: [
      { id: "t1", author: "Sarah Chen", body: "Mind-blowing examples!" },
      { id: "t2", author: "Mike Johnson", body: "Finally understood conditional types now." },
      { id: "t3", author: "Alex Morgan", body: "Clean and production-minded explanations." },
    ],
  },
  {
    id: "uiux-principles",
    title: "UI/UX Design Principles",
    excerpt:
      "Essential design principles every developer should know to create beautiful, intuitive, and consistent interfaces.",
    detail:
      "Design literacy helps frontend developers build better products. This modal expands on spacing, hierarchy, feedback, and consistency, with examples that connect visual judgment to implementation decisions.",
    author: "Sarah Chen",
    authorInitials: "S",
    commentsCount: 3,
    comments: [
      { id: "u1", author: "Alex Morgan", body: "Loved the balance between theory and practice." },
      { id: "u2", author: "Noah Kim", body: "The hierarchy section clicked for me instantly." },
      { id: "u3", author: "Jules Patel", body: "Useful reminders for shipping polished UI." },
    ],
  },
  {
    id: "web-performance",
    title: "Optimizing Web Performance",
    excerpt:
      "Practical techniques to make your websites load faster and provide better user experiences across devices.",
    detail:
      "Performance work is about perception as much as metrics. This article covers code splitting, image strategy, caching, and frontend patterns that keep the interface feeling immediate even as it grows richer.",
    author: "Alex Morgan",
    authorInitials: "A",
    commentsCount: 2,
    comments: [
      { id: "p1", author: "David Park", body: "Reduced my page load time by 60%!" },
      { id: "p2", author: "Emma Davis", body: "The image optimizations tips are gold." },
    ],
  },
];

export const profileHighlights = [
  "Published 24 frontend and design-system articles this year.",
  "Focused on React architecture, product writing, and interaction polish.",
  "Currently exploring UI systems that scale cleanly from MVP to production.",
];
