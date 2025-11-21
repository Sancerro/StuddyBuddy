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
  date: string | Date; // Stored as Firestore Timestamp -> serialized to ISO or Date in client
  createdAt: number; // Timestamp for sorting
}

export interface Notification {
  id: string;
  recipientId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: "match_request" | "match_accepted" | "match_declined";
  status: "pending" | "accepted" | "declined"; // Add status field
  postId?: string;
  postTitle?: string;
  createdAt: number;
  read: boolean;
}

export type CreatePostData = Omit<Post, "id" | "createdAt">;
export type CreateNotificationData = Omit<Notification, "id" | "createdAt" | "read" | "status">;
