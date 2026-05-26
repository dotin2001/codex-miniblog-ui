import { blogPosts, currentUser } from "@/lib/data";
import { AppShell } from "@/components/layout/app-shell";
import { BlogDashboard } from "@/components/blog/blog-dashboard";

export default function Home() {
  return (
    <AppShell user={currentUser}>
      <BlogDashboard posts={blogPosts} />
    </AppShell>
  );
}
