import { useEffect, useState } from "react";
import { subscribeToNotifications, markNotificationAsRead, updateNotificationStatus } from "@/firebase/firestore";
import { useAuth } from "./use-auth";
import type { Notification } from "@/types";
import { toast } from "sonner";

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
      setNotifications(newNotifications);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const markAsRead = async (id: string) => {
    await markNotificationAsRead(id);
  };

  const handleResponse = async (notificationId: string, status: "accepted" | "declined") => {
    try {
      await updateNotificationStatus(notificationId, status);
      toast.success(`Request ${status}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update request");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, loading, markAsRead, handleResponse, unreadCount };
}
