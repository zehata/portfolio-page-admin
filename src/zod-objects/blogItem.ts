import { z } from "zod";

export const blogItem = z.object({
  blog_id: z.string(),
  blog_title: z.string(),
});
