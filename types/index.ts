export interface Post {
  id: string;
  authorId: string; // User ID for security rules
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  title: string;
  description: string;
  course: string;
  date: string; // ISO string or formatted date string
  createdAt: number; // Timestamp for sorting
  likes: number;
  comments: number;
}

export type CreatePostData = Omit<Post, "id" | "createdAt" | "likes" | "comments">;
