"use client";

import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/hooks/use-notifications";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils/cn";

export function NotificationList() {
  const { notifications, unreadCount, markAsRead, handleResponse } = useNotifications();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[300px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 flex gap-3 items-start border-b last:border-0 transition-colors",
                  !notification.read && "bg-muted/50"
                )}
                onClick={() => !notification.read && markAsRead(notification.id)}
              >
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarImage src={notification.senderAvatar} />
                  <AvatarFallback>
                    {notification.senderName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 flex-1">
                  <p className="text-sm leading-none">
                    <span className="font-medium">{notification.senderName}</span>
                    {" sent a match request"}
                    {notification.postTitle && (
                      <span className="text-muted-foreground">
                        {" for "}
                        <span className="font-medium text-foreground">
                          {notification.postTitle}
                        </span>
                      </span>
                    )}
                  </p>
                  <div className="flex flex-col gap-2 mt-1.5">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                    </span>
                    
                    {notification.type === "match_request" && notification.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-7 px-2 text-green-600 hover:text-green-700 hover:bg-green-50 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResponse(notification.id, "accepted");
                          }}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResponse(notification.id, "declined");
                          }}
                        >
                          <X className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <span className={cn(
                          "text-xs font-medium px-2 py-0.5 rounded-full inline-block",
                          notification.status === "accepted" ? "bg-green-100 text-green-700" : 
                          notification.status === "declined" ? "bg-red-100 text-red-700" : ""
                        )}>
                          {notification.status && notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
