import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase/config";
import type { Post } from "@/types";

const POSTS_COLLECTION = "posts";

async function fetchPosts(): Promise<Post[]> {
  const q = query(collection(db, POSTS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : Date.now(),
    } as Post;
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}
