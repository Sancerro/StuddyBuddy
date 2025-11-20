"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils/cn";
import { getInitials } from "@/lib/utils/user";
import { addPost, updatePost, deletePost } from "@/firebase/firestore";
import { useAuth } from "@/hooks/use-auth";
import { createSessionSchema, type CreateSessionFormValues } from "@/lib/schemas";
import { toast } from "sonner";
import type { Post } from "@/types";

interface CreateSessionDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  postToEdit?: Post;
  mode?: "create" | "edit";
}

export function CreateSessionDialog({ 
  children, 
  open: controlledOpen, 
  onOpenChange: setControlledOpen,
  postToEdit,
  mode = "create"
}: CreateSessionDialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;
  
  const { user } = useAuth();
  
  const form = useForm<CreateSessionFormValues>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      title: postToEdit?.title ?? "",
      description: postToEdit?.description ?? "",
      course: postToEdit?.course ?? "",
      date: postToEdit ? new Date(postToEdit.date) : undefined,
    },
  });

  // Reset form when dialog opens/closes or postToEdit changes
  React.useEffect(() => {
    if (open) {
      form.reset({
        title: postToEdit?.title ?? "",
        description: postToEdit?.description ?? "",
        course: postToEdit?.course ?? "",
        date: postToEdit ? new Date(postToEdit.date) : undefined,
      });
    }
  }, [open, postToEdit, form]);

  async function onSubmit(values: CreateSessionFormValues) {
    if (!user) return;

    try {
      const dateISO = values.date.toISOString();
      
      if (mode === "edit" && postToEdit) {
        await updatePost(postToEdit.id, {
          ...values,
          date: dateISO,
        });
        toast.success("Session updated successfully!");
      } else {
      await addPost({
        ...values,
          date: dateISO,
        authorId: user.uid,
        author: {
          name: user.displayName || "Anonymous",
          avatar: user.photoURL || undefined,
            initials: getInitials(user.displayName),
        },
      });
        toast.success("Session created successfully!");
      }
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  const handleDelete = async () => {
    if (!postToEdit) return;
    
    try {
      await deletePost(postToEdit.id);
      toast.success("Session deleted successfully");
      setShowDeleteDialog(false);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete session");
    }
  };

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
            <DialogTitle>{mode === "edit" ? "Edit Study Session" : "Create Study Session"}</DialogTitle>
          <DialogDescription>
              {mode === "edit" 
                ? "Make changes to your study session details." 
                : "Fill in the details to create a new study session."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Calculus Midterm Review" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input placeholder="MATH 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
                control={form.control}
                name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Discussing chapters 1-3 and solving practice problems..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="flex gap-2">
                {mode === "edit" && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={() => setShowDeleteDialog(true)}
                    className="w-auto px-3"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" className="flex-1">
                  {mode === "edit" ? "Save Changes" : "Create Session"}
                </Button>
              </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your study session post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
