"use client";

import { useEffect, useState } from "react";
import type { BlogPost } from "@/types/blog";
import styles from "./blog-dashboard.module.css";

interface BlogDashboardProps {
  posts: BlogPost[];
}

export function BlogDashboard({ posts }: BlogDashboardProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPost(null);
      }
    };

    if (selectedPost) {
      document.body.classList.add("modal-open");
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleEscape);
    };
  }, [selectedPost]);

  return (
    <>
      <section className={styles.dashboard}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Blog Dashboard</h1>
            <p className={styles.heroCopy}>
              Explore insightful articles on web development, design, and modern
              technology. Share your thoughts and engage with our community.
            </p>
          </div>
        </div>

        <div className={styles.grid} aria-label="Blog articles">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              className={styles.card}
              onClick={() => setSelectedPost(post)}
            >
              <article className={styles.cardInner}>
                <h2 className={styles.cardTitle}>{post.title}</h2>
                <p className={styles.cardExcerpt}>{post.excerpt}</p>

                <div className={styles.authorRow}>
                  <span className={styles.authorAvatar} aria-hidden="true">
                    {post.authorInitials}
                  </span>
                  <span className={styles.authorName}>{post.author}</span>
                </div>

                <p className={styles.commentsCount}>{post.commentsCount} comments</p>

                <div className={styles.commentsPreview}>
                  {post.comments.slice(0, 2).map((comment) => (
                    <p key={comment.id} className={styles.commentLine}>
                      <span className={styles.commentAuthor}>{comment.author}:</span>{" "}
                      {comment.body}
                    </p>
                  ))}
                </div>
              </article>
            </button>
          ))}
        </div>
      </section>

      {selectedPost ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedPost(null)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="blog-modal-title"
            className={styles.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEyebrow}>Mini Blog</p>
                <h2 id="blog-modal-title" className={styles.modalTitle}>
                  {selectedPost.title}
                </h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => setSelectedPost(null)}
                aria-label="Close blog modal"
              >
                ×
              </button>
            </div>

            <p className={styles.modalDetail}>{selectedPost.detail}</p>

            <div className={styles.modalMeta}>
              <div className={styles.modalAuthor}>
                <span className={styles.authorAvatar} aria-hidden="true">
                  {selectedPost.authorInitials}
                </span>
                <div>
                  <p className={styles.modalMetaLabel}>Written by</p>
                  <p className={styles.modalMetaValue}>{selectedPost.author}</p>
                </div>
              </div>
              <div className={styles.modalStats}>
                <p className={styles.modalMetaLabel}>Comments</p>
                <p className={styles.modalMetaValue}>{selectedPost.commentsCount}</p>
              </div>
            </div>

            <div className={styles.modalComments}>
              <h3 className={styles.modalSectionTitle}>Community Notes</h3>
              {selectedPost.comments.map((comment) => (
                <article key={comment.id} className={styles.modalCommentCard}>
                  <p className={styles.commentAuthor}>{comment.author}</p>
                  <p className={styles.modalCommentBody}>{comment.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
