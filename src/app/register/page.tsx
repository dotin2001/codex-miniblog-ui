import { AuthPage } from "@/components/auth/auth-page";

export default function RegisterPage() {
  return (
    <AuthPage
      eyebrow="Join BlogHub"
      title="Create your account"
      description="Set up a profile for reading, writing, and keeping your mini blog workspace close."
      submitLabel="Create Account"
      alternatePrompt="Already have an account?"
      alternateHref="/login"
      alternateLabel="Sign in"
      fields={[
        { id: "name", label: "Name", type: "text", autoComplete: "name" },
        { id: "email", label: "Email", type: "email", autoComplete: "email" },
        {
          id: "password",
          label: "Password",
          type: "password",
          autoComplete: "new-password",
        },
        {
          id: "confirm-password",
          label: "Confirm Password",
          type: "password",
          autoComplete: "new-password",
        },
      ]}
    />
  );
}
