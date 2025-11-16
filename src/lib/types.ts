export type Theme = "LIGHT" | "DARK";

export type PostType = "IMAGE" | "VIDEO" | "AUDIO" | "TEXT";

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  bio?: string | null;
  avatarUrl?: string | null;
  theme: Theme;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: string;
  userId: string;
  type: PostType;
  title?: string | null;
  content?: string | null;
  mediaUrls?: string[] | null;
  embedUrl?: string | null;
  tags?: string[] | null;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
  user?: User;
}
