"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Check, MoreVertical, Pencil } from "lucide-react";
import type { Post } from "@/types";
import { useAuth } from "@/hooks/use-auth";
import { useConnect } from "@/hooks/use-connect";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CreateSessionDialog } from "./CreateSessionDialog";
import { format, formatDistanceToNow } from "date-fns";

export function PostCard({ post }: { post: Post }) {
  const { isConnected, isLoading, connect } = useConnect();
  const { user } = useAuth();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const isOwner = user?.uid === post.authorId;

  const handleConnect = () => {
    if (!user) {
      toast.error("Please sign in to connect");
      return;
    }
    connect(post.author.name);
  };

  const formattedDate = post.date 
    ? format(new Date(post.date), "PPP") 
    : "No date";

  const timeAgo = post.createdAt 
    ? formatDistanceToNow(post.createdAt, { addSuffix: true }) 
    : "";

  return (
    <>
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
                <p className="text-xs text-muted-foreground">Posted {timeAgo}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{post.course}</Badge>
                {isOwner && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setShowEditDialog(true)} className="cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
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
              <span>{formattedDate}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3 flex justify-end text-muted-foreground">
          <Button 
            size="sm" 
            onClick={handleConnect}
            disabled={isConnected || isLoading || !user || isOwner}
            variant={isConnected ? "secondary" : "default"}
            className={`${isConnected ? "text-green-600" : ""} cursor-pointer`}
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

      <CreateSessionDialog 
        open={showEditDialog} 
        onOpenChange={setShowEditDialog}
        postToEdit={post}
        mode="edit"
      />
    </>
  );
}
