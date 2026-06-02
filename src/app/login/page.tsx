import { AuthPage } from "@/components/auth/auth-page";

export default function LoginPage() {
  return (
    <AuthPage
      eyebrow="Welcome back"
      title="Sign in to BlogHub"
      description="Access your mini blog dashboard and continue exploring thoughtful product stories."
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
    />
  );
}
