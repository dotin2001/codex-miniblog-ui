import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { blogPosts } from "@/lib/data";
import { BlogDashboard } from "@/components/blog/blog-dashboard";

describe("BlogDashboard", () => {
  it("opens a blog modal when a blog card is clicked", async () => {
    const user = userEvent.setup();

    render(<BlogDashboard posts={blogPosts} />);

    await user.click(screen.getByRole("button", { name: /Getting Started with React 18/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/React 18 introduced concurrent rendering/i)).toBeInTheDocument();
  });

  it("closes the modal from the close button", async () => {
    const user = userEvent.setup();

    render(<BlogDashboard posts={blogPosts} />);

    await user.click(screen.getByRole("button", { name: /Modern CSS Techniques for 2026/i }));
    await user.click(screen.getByRole("button", { name: /close blog modal/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
