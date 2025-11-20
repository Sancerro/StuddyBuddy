"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MessageSquare, ThumbsUp, Check } from "lucide-react";
import type { Post } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useConnect } from "@/hooks/use-connect";
import { toast } from "sonner";

export function PostCard({ post }: { post: Post }) {
  const { isConnected, isLoading, connect } = useConnect();
  const { user } = useAuth();

  const handleConnect = () => {
    if (!user) {
      toast.error("Please sign in to connect");
      return;
    }
    connect(post.author.name);
  };

  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-base">{post.author.name}</h3>
              <p className="text-xs text-muted-foreground">Posted 2 hours ago</p>
            </div>
            <Badge variant="secondary">{post.course}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="text-muted-foreground line-clamp-3">{post.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md">
            <Calendar className="h-3.5 w-3.5" />
            <span>{post.date}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between text-muted-foreground">
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="gap-1 pl-0 hover:bg-transparent hover:text-primary">
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-transparent hover:text-primary">
            <MessageSquare className="h-4 w-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button 
          size="sm" 
          onClick={handleConnect}
          disabled={isConnected || isLoading || !user || user.uid === post.authorId}
          variant={isConnected ? "secondary" : "default"}
          className={isConnected ? "text-green-600" : ""}
        >
          {isConnected ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Request Sent
            </>
          ) : (
            "Connect"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
