"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPost, updatePost, deletePost } from "@/firebase/posts";
import { createSessionSchema, type CreateSessionFormValues } from "@/lib/schemas";
import { useAuth } from "@/hooks/use-auth";
import { useInvalidatePosts } from "@/hooks/use-posts";
import { getInitials } from "@/lib/utils/user";
import { toast } from "sonner";
import type { Post } from "@/types";

interface UseSessionFormProps {
  postToEdit?: Post;
  mode: "create" | "edit";
  isOpen: boolean;
}

export function useSessionForm({ postToEdit, mode, isOpen }: UseSessionFormProps) {
  const { user } = useAuth();
  const invalidatePosts = useInvalidatePosts();
  
  const form = useForm<CreateSessionFormValues>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      title: postToEdit?.title ?? "",
      description: postToEdit?.description ?? "",
      course: postToEdit?.course ?? "",
      date: postToEdit ? new Date(postToEdit.date) : undefined,
    },
  });

  // Reset form when dialog opens or postToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (postToEdit) {
        form.reset({
          title: postToEdit.title,
          description: postToEdit.description,
          course: postToEdit.course,
          date: new Date(postToEdit.date),
        });
      } else {
        form.reset({
          title: "",
          description: "",
          course: "",
          date: undefined,
        });
      }
    }
  }, [isOpen, postToEdit, form]);

  const onSubmit = async (values: CreateSessionFormValues) => {
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
      invalidatePosts();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const deleteSession = async () => {
    if (!postToEdit) return;

    try {
      await deletePost(postToEdit.id);
      toast.success("Session deleted successfully");
      invalidatePosts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete session");
    }
  };

  return { form, onSubmit, deleteSession };
}
