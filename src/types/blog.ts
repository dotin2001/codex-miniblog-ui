export interface CommentPreview {
  id: string;
  author: string;
  body: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  detail: string;
  author: string;
  authorInitials: string;
  commentsCount: number;
  comments: CommentPreview[];
}

export interface UserProfile {
  name: string;
  initials: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  website: string;
}
