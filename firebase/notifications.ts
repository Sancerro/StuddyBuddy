import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { CreateNotificationData, Notification } from "@/types";

const NOTIFICATIONS_COLLECTION = "notifications";

const mapNotification = (docSnapshot: QueryDocumentSnapshot<DocumentData>): Notification => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    ...data,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now(),
  } as Notification;
};

export const addNotification = async (notificationData: CreateNotificationData) => {
  await addDoc(collection(db, NOTIFICATIONS_COLLECTION), {
    ...notificationData,
    status: "pending",
    createdAt: serverTimestamp(),
    read: false,
  });
};

export const subscribeToNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void
) => {
  const q = query(
    collection(db, NOTIFICATIONS_COLLECTION),
    where("recipientId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(mapNotification));
  });
};

export const markNotificationAsRead = async (notificationId: string) => {
  const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
  await updateDoc(docRef, { read: true });
};

export const updateNotificationStatus = async (
  notificationId: string,
  status: "accepted" | "declined"
) => {
  const docRef = doc(db, NOTIFICATIONS_COLLECTION, notificationId);
  await updateDoc(docRef, {
    status,
    read: true, // Auto-read when responding
  });
};
