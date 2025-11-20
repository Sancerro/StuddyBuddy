import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Post, CreatePostData, CreateNotificationData, Notification } from "@/types";

const POSTS_COLLECTION = "posts";
const NOTIFICATIONS_COLLECTION = "notifications";

// Post Functions
export const addPost = async (postData: CreatePostData) => {
  try {
    const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
      ...postData,
      date: Timestamp.fromDate(new Date(postData.date)), // Store as Firestore Timestamp
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
};

export const updatePost = async (postId: string, postData: Partial<CreatePostData>) => {
  try {
    const updateData = { ...postData };
    if (updateData.date) {
      // @ts-ignore - handling both string (ISO) and Date object inputs
      updateData.date = Timestamp.fromDate(new Date(updateData.date));
    }
    
    const docRef = doc(db, POSTS_COLLECTION, postId);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    const docRef = doc(db, POSTS_COLLECTION, postId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  const q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore Timestamp to ISO string for frontend use
        date: data.date instanceof Timestamp ? data.date.toDate().toISOString() : data.date,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now(),
      } as Post;
    });
    callback(posts);
  });
};

// Notification Functions
export const addNotification = async (notificationData: CreateNotificationData) => {
  try {
    await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
      ...notificationData,
      status: "pending",
      createdAt: serverTimestamp(),
      read: false,
    });
  } catch (error) {
    console.error("Error adding notification:", error);
    throw error;
  }
};

export const subscribeToNotifications = (userId: string, callback: (notifications: Notification[]) => void) => {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("recipientId", "==", userId),
    orderBy("createdAt", "desc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now(),
      } as Notification;
    });
    callback(notifications);
  });
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, { read: true });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};

export const updateNotificationStatus = async (notificationId: string, status: "accepted" | "declined") => {
  try {
    const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
    await updateDoc(docRef, { 
      status,
      read: true // Auto-read when responding
    });
  } catch (error) {
    console.error("Error updating notification status:", error);
    throw error;
  }
};
