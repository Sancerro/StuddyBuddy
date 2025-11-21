import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "@/firebase/posts";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
}

export function useInvalidatePosts() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ["posts"] });
}
