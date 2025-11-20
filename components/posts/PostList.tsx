"use client";

import { EmptyState } from "@/components/common/EmptyState";
import { PostCard, type Post } from "./PostCard";
import { Search } from "lucide-react";

const noop = () => {};

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <EmptyState
        title="No posts found"
        description="There are no study sessions available right now. Be the first to create one!"
        actionLabel="Create Study Session"
        onAction={noop}
        icon={Search}
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

