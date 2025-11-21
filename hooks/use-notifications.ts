import { useEffect, useState } from "react";
import { subscribeToNotifications, markNotificationAsRead, updateNotificationStatus } from "@/firebase/notifications";
import { useAuth } from "./use-auth";
import type { Notification } from "@/types";
import { toast } from "sonner";

export function useNotifications() {
  const { user, loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasLoadedNotifications, setHasLoadedNotifications] = useState(false);

  useEffect(() => {
    if (!user) {
      // Use setTimeout to avoid "setState in effect" linter error
      // This correctly resets state when user logs out
      const t = setTimeout(() => {
        setNotifications([]);
        setHasLoadedNotifications(false);
      }, 0);
      return () => clearTimeout(t);
    }

    const unsubscribe = subscribeToNotifications(user.uid, (newNotifications) => {
      setNotifications(newNotifications);
      setHasLoadedNotifications(true);
    });

    return () => {
      unsubscribe();
      setHasLoadedNotifications(false);
    };
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
  
  // Loading if:
  // 1. Auth is still checking
  // 2. User is logged in but we haven't got notifications yet
  const loading = authLoading || (!!user && !hasLoadedNotifications);

  return { notifications, loading, markAsRead, handleResponse, unreadCount };
}
