export interface Notification {
  id: string;
  userId: string; // The recipient
  type: "match_request" | "match_accepted";
  title: string;
  message: string;
  senderId: string;
  senderName: string;
  read: boolean;
  createdAt: number;
  link?: string; // e.g., to a specific post or chat
}

