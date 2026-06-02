"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import styles from "./auth-page.module.css";

type AuthFieldType = "email" | "password" | "text";

export interface AuthField {
  id: string;
  label: string;
  type: AuthFieldType;
  autoComplete: string;
}

interface AuthPageProps {
  eyebrow: string;
  title: string;
  description: string;
  submitLabel: string;
  alternatePrompt: string;
  alternateHref: string;
  alternateLabel: string;
  fields: AuthField[];
}

export function AuthPage({
  eyebrow,
  title,
  description,
  submitLabel,
  alternatePrompt,
  alternateHref,
  alternateLabel,
  fields,
}: AuthPageProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="auth-title">
        <div className={styles.brandPanel}>
          <Link href="/" className={styles.brand}>
            BlogHub
          </Link>
          <div className={styles.brandCopy}>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 id="auth-title" className={styles.title}>
              {title}
            </h1>
            <p className={styles.description}>{description}</p>
          </div>
        </div>

        <div className={styles.formPanel}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              {fields.map((field) => (
                <label key={field.id} className={styles.fieldLabel} htmlFor={field.id}>
                  <span>{field.label}</span>
                  <input
                    id={field.id}
                    name={field.id}
                    className={styles.fieldInput}
                    type={field.type}
                    autoComplete={field.autoComplete}
                  />
                </label>
              ))}
            </div>

            <button type="submit" className={styles.submitButton}>
              {submitLabel}
            </button>
          </form>

          <p className={styles.alternateText}>
            {alternatePrompt}{" "}
            <Link href={alternateHref} className={styles.alternateLink}>
              {alternateLabel}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
