import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import type { CreatePostData, Post } from "@/types";

const POSTS_COLLECTION = "posts";

const mapPost = (docSnapshot: QueryDocumentSnapshot<DocumentData>): Post => {
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    ...data,
    date: data.date instanceof Timestamp ? data.date.toDate() : data.date,
    createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now(),
  } as Post;
};

export const fetchPosts = async (): Promise<Post[]> => {
  const q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(mapPost);
};

export const subscribeToPosts = (callback: (posts: Post[]) => void) => {
  const q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(mapPost));
  });
};

export const addPost = async (postData: CreatePostData) => {
  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    ...postData,
    date: Timestamp.fromDate(new Date(postData.date)), // Store as Firestore Timestamp
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updatePost = async (postId: string, postData: Partial<CreatePostData>) => {
  const updateData = { ...postData };
  if (updateData.date) {
    // @ts-expect-error handling both string (ISO) and Date object inputs
    updateData.date = Timestamp.fromDate(new Date(updateData.date));
  }

  const docRef = doc(db, POSTS_COLLECTION, postId);
  await updateDoc(docRef, updateData);
};

export const deletePost = async (postId: string) => {
  const docRef = doc(db, POSTS_COLLECTION, postId);
  await deleteDoc(docRef);
};
