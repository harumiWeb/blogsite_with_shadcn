import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, {
    message: "タイトルは必須です。",
  }).max(100, {
    message: "タイトルは100文字以内で入力してください。",
  }).refine((value) => value.trim() !== "", {
    message: "タイトルは必須です。",
  }),
  content: z.any().optional(),
});

export type PostSchemaType = z.infer<typeof postSchema>;