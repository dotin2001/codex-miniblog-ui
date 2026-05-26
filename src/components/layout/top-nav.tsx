"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./app-shell.module.css";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/profile", label: "Profile" },
];

interface TopNavProps {
  userName: string;
  userInitials: string;
}

export function TopNav({ userName, userInitials }: TopNavProps) {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brandRow}>
          <Link href="/" className={styles.brand}>
            BlogHub
          </Link>
          <nav aria-label="Primary navigation" className={styles.nav}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={isActive ? styles.navLinkActive : styles.navLink}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={styles.userArea}>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.avatar} aria-hidden="true">
            {userInitials}
          </span>
        </div>
      </div>
    </header>
  );
}
