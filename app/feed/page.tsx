"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/mode-toggle";
import { PostList } from "@/components/posts/PostList";
import { Post } from "@/components/posts/PostCard";
import { GraduationCap, Plus, Search, Bell, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data for now - will be replaced with Firebase data
const MOCK_POSTS: Post[] = []; 

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* App Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Link href="/feed" className="flex items-center gap-2 font-bold text-xl">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span>StudyBuddy</span>
            </Link>
            <div className="hidden md:flex relative w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses, topics..."
                className="w-full bg-muted pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="h-5 w-5" />
            </Button>
            <ModeToggle />
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Study Sessions</h1>
              <p className="text-muted-foreground mt-1">
                Find a partner or join a group session for your courses.
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Session
            </Button>
          </div>

          {/* Content */}
          <PostList posts={MOCK_POSTS} />
        </div>
      </main>
    </div>
  );
}

