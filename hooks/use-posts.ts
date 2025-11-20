import { useState, useEffect } from "react";
import { subscribeToPosts } from "@/firebase/firestore";
import type { Post } from "@/types";

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPosts((newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { posts, loading };
}

