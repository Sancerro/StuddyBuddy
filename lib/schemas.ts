import * as z from "zod";

export const createSessionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  date: z.date().min(new Date(), "Date must be in the future"),
});

export type CreateSessionFormValues = z.infer<typeof createSessionSchema>;
