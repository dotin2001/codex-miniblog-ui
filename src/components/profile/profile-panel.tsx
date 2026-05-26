import type { UserProfile } from "@/types/blog";
import styles from "./profile-panel.module.css";

interface ProfilePanelProps {
  user: UserProfile;
  highlights: string[];
}

export function ProfilePanel({ user, highlights }: ProfilePanelProps) {
  return (
    <section className={styles.panel}>
      <div className={styles.hero}>
        <div className={styles.identity}>
          <span className={styles.avatar} aria-hidden="true">
            {user.initials}
          </span>
          <div>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.title}>{user.title}</p>
          </div>
        </div>
        <p className={styles.bio}>{user.bio}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Profile Details</h2>
          <dl className={styles.details}>
            <div>
              <dt>Location</dt>
              <dd>{user.location}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{user.email}</dd>
            </div>
            <div>
              <dt>Website</dt>
              <dd>{user.website}</dd>
            </div>
          </dl>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Highlights</h2>
          <ul className={styles.highlights}>
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
