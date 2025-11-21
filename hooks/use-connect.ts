"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./use-auth";
import { addNotification } from "@/firebase/notifications";

export function useConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const connect = async (recipientId: string, recipientName: string, postId: string, postTitle: string) => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Create notification for the recipient
      await addNotification({
        recipientId,
        senderId: user.uid,
        senderName: user.displayName || "Anonymous",
        senderAvatar: user.photoURL || undefined,
        type: "match_request",
        postId,
        postTitle,
      });

      setIsConnected(true);
      toast.success("Match request sent to " + recipientName);
    } catch (error) {
      console.error(error);
      toast.error("Failed to send request");
    } finally {
      setIsLoading(false);
    }
  };

  return { isConnected, isLoading, connect };
}
