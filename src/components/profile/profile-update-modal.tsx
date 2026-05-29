"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import type { UserProfile } from "@/types/blog";
import styles from "./profile-panel.module.css";

interface ProfileUpdateModalProps {
  user: UserProfile;
}

interface FormState {
  name: string;
  email: string;
  title: string;
}

function getInitialState(user: UserProfile): FormState {
  return {
    name: user.name,
    email: user.email,
    title: user.title,
  };
}

export function ProfileUpdateModal({ user }: ProfileUpdateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => getInitialState(user));

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const openModal = () => {
    setForm(getInitialState(user));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updateField =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  return (
    <>
      <button type="button" className={styles.updateButton} onClick={openModal}>
        Update Profile
      </button>

      {isOpen ? (
        <div className={styles.modalBackdrop} onClick={closeModal} role="presentation">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-update-modal-title"
            className={styles.profileModal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 id="profile-update-modal-title" className={styles.modalTitle}>
                Update Profile
              </h2>
              <button
                type="button"
                className={styles.closeButton}
                aria-label="Close update profile modal"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <div className={styles.modalForm}>
              <label className={styles.fieldLabel}>
                <span>Name</span>
                <input
                  className={styles.fieldInput}
                  value={form.name}
                  onChange={updateField("name")}
                />
              </label>

              <label className={styles.fieldLabel}>
                <span>Email</span>
                <input
                  className={styles.fieldInput}
                  value={form.email}
                  onChange={updateField("email")}
                />
              </label>

              <label className={styles.fieldLabel}>
                <span>Title</span>
                <input
                  className={styles.fieldInput}
                  value={form.title}
                  onChange={updateField("title")}
                />
              </label>
            </div>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={closeModal}
              >
                Cancel
              </button>
              <button type="button" className={styles.primaryButton} onClick={closeModal}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
