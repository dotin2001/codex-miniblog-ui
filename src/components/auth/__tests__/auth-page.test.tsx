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
