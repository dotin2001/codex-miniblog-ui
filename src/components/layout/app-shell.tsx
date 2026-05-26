import type { ReactNode } from "react";
import type { UserProfile } from "@/types/blog";
import { TopNav } from "./top-nav";
import styles from "./app-shell.module.css";

interface AppShellProps {
  children: ReactNode;
  user: UserProfile;
}

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className={styles.page}>
      <TopNav userName={user.name} userInitials={user.initials} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
