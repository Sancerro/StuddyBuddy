"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connect = async (authorName: string) => {
    setIsLoading(true);
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    setIsConnected(true);
    setIsLoading(false);
    toast.success("Match request sent to " + authorName);
  };

  return { isConnected, isLoading, connect };
}

